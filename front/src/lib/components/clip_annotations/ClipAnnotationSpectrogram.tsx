import { memo } from "react";

import Card from "@/lib/components/ui/Card";

const ClipAnnotationSpectrogram = memo(
  function ClipAnnotationSpectrogram(props: {
    ViewportToolbar?: JSX.Element;
    AnnotationControls?: JSX.Element;
    Player?: JSX.Element;
    SettingsMenu?: JSX.Element;
    ViewportBar?: JSX.Element;
    Canvas: JSX.Element;
    SelectedSoundEvent?: JSX.Element;
  }) {
    return (
      <Card className="w-full">
        {(props.ViewportToolbar ||
          props.AnnotationControls ||
          props.SettingsMenu) && (
          <div className="flex flex-row flex-wrap gap-4 items-center">
            {props.ViewportToolbar}
            {props.AnnotationControls}
            {props.SettingsMenu}
          </div>
        )}
        {/* RIMBA: the player gets its own row, as wide as the spectrogram */}
        {props.Player}
        {props.Canvas}
        {props.ViewportBar}
        {props.SelectedSoundEvent}
      </Card>
    );
  },
);

export default ClipAnnotationSpectrogram;
