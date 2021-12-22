import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTonicPow } from "../../context/tonicpow";
import { WidgetProps, WidgetType } from "../../index";
import { FetchStatus } from "../../types/common";

const Widget: React.FC<WidgetProps> = ({
  className,
  height,
  widgetId,
  width,
  rotateInterval = 0,
  widgetType = WidgetType.Banner,
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
    console.log("should we get it?", widgetId);
    return getWidget(widgetId);
  }, [getWidget, widgetId]);

  useEffect(() => {
    const load = async () => {
      console.log("loading");
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

    console.log("should we load?", widgetId);
    if (!!widgetId && widgetStatus === FetchStatus.Idle) {
      console.log("calling load");
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
      console.log("widget is loaded");
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

  const renderDisplayWidget = useMemo(
    () => (
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
    ),
    [widgetId, imgWidth, imgHeight, className, widgetStatus]
  );

  return widgetType === "share" ? renderShareButton : renderDisplayWidget;
};

export default Widget;
