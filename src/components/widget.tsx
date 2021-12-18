import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTonicPow } from "../context/tonicpow";
import { FetchStatus } from "../types/common";

export interface WidgetProps {
  className?: string;
  widgetId: string;
  width?: number;
  height?: number;
  rotateInterval?: number;
  widgetType?: "banner" | "share";
  buttonText?: string;
  buttonTextAuth?: string;
  buttonTextDone?: string;
  buttonTextLoading?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  target?: string;
}

const Widget: React.FC<WidgetProps> = ({
  className,
  height,
  widgetId,
  width,
  rotateInterval = 0,
  widgetType = "banner",
  buttonText = "Get Link",
  buttonTextAuth = "Log In",
  buttonTextDone = "Copied",
  buttonTextLoading = "Loading",
  target,
}) => {
  if (!target) {
    target = window.location.href;
  }
  const { tonicPow, widgets, getWidget } = useTonicPow();

  const [imgWidth, setImgWidth] = useState<number>(width || 0);
  const [imgHeight, setImgHeight] = useState<number>(height || 0);

  const [wasUnmounted, setWasUnmounted] = useState<boolean>();
  const [widgetStatus, setWidgetStatus] = useState<FetchStatus>(
    FetchStatus.Idle
  );

  const unmounted = useRef(false);

  // use the useEffect cleanup function to know if the component (page) was unmounted
  // so we don't update the state afterwards and thereby introduce a memory leak
  useEffect(
    () => () => {
      unmounted.current = true;
      setWidgetStatus(FetchStatus.Idle);
      setWasUnmounted(true);
    },
    []
  );

  const loadedWidget = useMemo(() => {
    return getWidget(widgetId);
  }, [getWidget, widgetId]);

  useEffect(() => {
    const load = async () => {
      setWidgetStatus(FetchStatus.Loading);
      try {
        await tonicPow?.load();
        if (rotateInterval) {
          setTimeout(() => {
            setWidgetStatus(FetchStatus.Idle);
          }, rotateInterval * 1000);
        }
        //}
      } catch (e) {
        console.log("Failed to load widget", e);
        setWidgetStatus(FetchStatus.Error);
      }
    };

    if (widgetStatus === FetchStatus.Idle) {
      load();
    }
  }, [
    height,
    rotateInterval,
    tonicPow,
    wasUnmounted,
    widgetId,
    widgetStatus,
    widgets,
    width,
    location,
  ]);

  useEffect(() => {
    if (loadedWidget) {
      const { height, width } = loadedWidget;
      if (widgetType === "banner") {
        setImgHeight(height);
        setImgWidth(width);
        setWidgetStatus(FetchStatus.Success);
      }
    }
  }, [getWidget, loadedWidget, widgetId, widgetStatus, widgetType, widgets]);

  const renderShareButton = useMemo(() => {
    return (
      <div
        className="tonicpow-widget h-12 w-full"
        data-widget-type="share-button"
        data-button-id={widgetId}
        data-environment={"production"} // TODO
        data-width={width}
        data-height={height}
        data-get-link-text={buttonText}
        data-auth-text={buttonTextAuth}
        data-done-text={buttonTextDone}
        data-error-text="Error"
        data-loading-text={buttonTextLoading}
        data-target={target}
      ></div>
    );
  }, [widgetId, buttonText, buttonTextAuth, buttonTextDone, buttonTextLoading]);

  return widgetType === "share" ? (
    renderShareButton
  ) : (
    <>
      <div className="flex w-full p-4">
        {FetchStatus.Error !== widgetStatus && (
          <div
            className={`transition duration-700 ease-in-out ${
              widgetStatus === FetchStatus.Idle ||
              widgetStatus === FetchStatus.Loading
                ? "opacity-0"
                : "opacity-100"
            } tonicpow-widget ${className ? className : ""}`}
            data-widget-id={`${widgetId}`}
            style={{ width: imgWidth, height: imgHeight }}
          ></div>
        )}
      </div>
    </>
  );
};

export default Widget;
