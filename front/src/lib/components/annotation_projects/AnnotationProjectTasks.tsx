import FilterBar from "@/lib/components/filters/FilterBar";
import FilterMenu from "@/lib/components/filters/FilterMenu";
import recordingFilterDefs from "@/lib/components/filters/recordings";
import * as icons from "@/lib/components/icons";
import * as inputs from "@/lib/components/inputs";
import * as ui from "@/lib/components/ui";

import { t } from "@/lib/i18n";
import type * as types from "@/lib/types";

export default function AnnotationProjectTasks(props: {
  dataset?: types.Dataset;
  isLoading: boolean;
  numSelectedRecordings?: number;
  numSelectedClips?: number;
  recordingFilter: types.RecordingFilter;
  fixedFilterFields: (keyof types.RecordingFilter)[];
  subsampleRecordings?: boolean;
  maxRecordings?: number;
  shouldClip?: boolean;
  clipLength?: number;
  clipOverlap?: number;
  subsampleClip?: boolean;
  maxClipsPerRecording?: number;
  onSetFilterField?: <T extends keyof types.RecordingFilter>(
    field: T,
    value: types.RecordingFilter[T],
  ) => void;
  onToggleSubsample?: (subsample: boolean) => void;
  onSetMaxRecordings?: (maxRecordings: number) => void;
  onAddTasks?: () => void;
  onToggleClip?: (clip: boolean) => void;
  onSetClipLength?: (clipLength: number) => void;
  onSetClipOverlap?: (clipOverlap: number) => void;
  onSetClipSubsample?: (subsample: boolean) => void;
  onSetMaxClips?: (maxClips: number) => void;
  DatasetSearch: JSX.Element;
}) {
  return (
    <div className="flex flex-col gap-8">
      <ui.H2>
        <icons.TasksIcon className="inline-block mr-2 w-5 h-5 align-middle" />
        {t("Tambah klip")}
      </ui.H2>
      <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-y-6 max-w-prose">
          <p className="max-w-prose text-stone-500">
            {t(
              "Di sini klip ditambahkan ke proyek anotasi: pilih kumpulan rekaman, saring berkasnya bila perlu, lalu atur cara memotong klip.",
            )}
          </p>
          <SelectDataset DatasetSearch={props.DatasetSearch} />
          {props.dataset != null && (
            <>
              <SelectRecordings
                subsample={props.subsampleRecordings}
                maxRecordings={props.maxRecordings}
                filter={props.recordingFilter}
                fixedFilterFields={props.fixedFilterFields}
                onSetFilterField={props.onSetFilterField}
                onSetMaxRecordings={props.onSetMaxRecordings}
                onToggleSubsample={props.onToggleSubsample}
              />
              <ExtractClips
                shouldClip={props.shouldClip}
                clipLength={props.clipLength}
                clipOverlap={props.clipOverlap}
                subsampleClip={props.subsampleClip}
                maxClipsPerRecording={props.maxClipsPerRecording}
                onToggleClip={props.onToggleClip}
                onSetClipLength={props.onSetClipLength}
                onSetClipOverlap={props.onSetClipOverlap}
                onSetClipSubsample={props.onSetClipSubsample}
                onSetMaxClips={props.onSetMaxClips}
              />
            </>
          )}
        </div>
        <div className="w-96">
          <div className="sticky top-8">
            <ReviewClips
              isLoading={props.isLoading}
              dataset={props.dataset}
              numClips={props.numSelectedClips}
              numRecordings={props.numSelectedRecordings}
              onAdd={props.onAddTasks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectDataset({ DatasetSearch }: { DatasetSearch: JSX.Element }) {
  return (
    <ui.Card>
      <div>
        <ui.H3 className="text-lg">{t("Pilih rekaman audio")}</ui.H3>
        <p className="text-stone-500">
          {t("Pilih kumpulan rekaman sumber klip.")}
        </p>
      </div>
      {DatasetSearch}
    </ui.Card>
  );
}

function SelectRecordings({
  subsample = false,
  maxRecordings,
  filter,
  fixedFilterFields,
  onSetFilterField,
  onToggleSubsample,
  onSetMaxRecordings,
}: {
  subsample?: boolean;
  maxRecordings?: number;
  filter?: types.RecordingFilter;
  fixedFilterFields?: (keyof types.RecordingFilter)[];
  onSetFilterField?: <T extends keyof types.RecordingFilter>(
    field: T,
    value: types.RecordingFilter[T],
  ) => void;
  onToggleSubsample?: (subsample: boolean) => void;
  onSetMaxRecordings?: (maxRecordings: number) => void;
}) {
  return (
    <ui.Card>
      <div>
        <ui.H3 className="text-lg">{t("Pilih berkas")}</ui.H3>
        <p className="text-stone-500">
          {t(
            "Pilih berkas yang akan dipotong jadi klip. Bisa disaring dan diambil sebagian.",
          )}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <inputs.Group
          name="recording-filter"
          label={t("Saring berkas")}
          help={t("Ambil sebagian berkas lewat saringan.")}
        >
          <div className="flex flex-row gap-2 items-center">
            <div className="grow">
              <FilterBar
                showIfEmpty
                filter={filter}
                fixedFilterFields={fixedFilterFields}
                filterDef={recordingFilterDefs}
              />
            </div>
            <FilterMenu
              onSetFilterField={onSetFilterField}
              filterDef={recordingFilterDefs}
              mode="text"
              button={
                <>
                  {t("Tambah saringan")}{" "}
                  <icons.FilterIcon className="inline-block w-4 h-4 stroke-2" />
                </>
              }
            />
          </div>
        </inputs.Group>
        <inputs.Group
          name="subsample"
          label={t("Ambil sebagian berkas")}
          help={t("Batas jumlah berkas; diambil acak, semua kalau kosong.")}
        >
          <div className="inline-flex gap-3 items-center w-full">
            <inputs.Toggle
              isSelected={subsample}
              onChange={onToggleSubsample}
            />
            <inputs.Input
              className="grow"
              type="number"
              placeholder={t("Maksimum jumlah berkas")}
              value={subsample ? maxRecordings : undefined}
              onChange={(event) =>
                onSetMaxRecordings?.(parseInt(event.target.value))
              }
              required={subsample}
              disabled={!subsample}
            />
          </div>
        </inputs.Group>
      </div>
    </ui.Card>
  );
}

function ExtractClips({
  shouldClip = true,
  clipLength = 3,
  clipOverlap = 0,
  subsampleClip = false,
  maxClipsPerRecording = 3,
  onToggleClip,
  onSetClipLength,
  onSetClipOverlap,
  onSetClipSubsample,
  onSetMaxClips,
}: {
  shouldClip?: boolean;
  clipLength?: number;
  clipOverlap?: number;
  subsampleClip?: boolean;
  maxClipsPerRecording?: number;
  onToggleClip?: (clip: boolean) => void;
  onSetClipLength?: (clipLength: number) => void;
  onSetClipOverlap?: (clipOverlap: number) => void;
  onSetClipSubsample?: (subsample: boolean) => void;
  onSetMaxClips?: (maxClips: number) => void;
}) {
  return (
    <ui.Card>
      <div>
        <ui.H3>{t("Pemotongan klip")}</ui.H3>
        <p className="text-stone-500">
          {t("Atur cara memotong klip dari berkas terpilih.")}
        </p>
      </div>
      <inputs.Group
        name="clip"
        label={t("Potong jadi klip")}
        help={t(
          "Nyalakan untuk memotong berkas jadi klip pendek; matikan untuk memakai seluruh berkas sebagai satu klip.",
        )}
      >
        <inputs.Toggle isSelected={shouldClip} onChange={onToggleClip} />
      </inputs.Group>
      {shouldClip && (
        <>
          <inputs.Group
            name="clipLength"
            label={t("Panjang klip")}
            help={t("Panjang tiap klip, dalam detik.")}
          >
            <inputs.Input
              type="number"
              value={clipLength}
              onChange={(e) => onSetClipLength?.(e.target.valueAsNumber)}
              required
              step={0.1}
            />
          </inputs.Group>
          <inputs.Group
            name="overlap"
            label={t("Tumpang tindih")}
            help={t("Tumpang tindih antar klip, dalam detik.")}
          >
            <inputs.Input
              type="number"
              value={clipOverlap}
              onChange={(e) => onSetClipOverlap?.(e.target.valueAsNumber)}
              required
            />
          </inputs.Group>
          <inputs.Group
            name="subsample"
            label={t("Ambil sebagian klip")}
            help={t("Batas klip per berkas; diambil acak, semua kalau kosong.")}
          >
            <div className="inline-flex gap-3 items-center w-full">
              <inputs.Toggle
                isSelected={subsampleClip}
                onChange={onSetClipSubsample}
              />
              <inputs.Input
                className="grow"
                type="number"
                placeholder={t("Maksimum klip per berkas")}
                value={subsampleClip ? maxClipsPerRecording : undefined}
                onChange={(e) => onSetMaxClips?.(e.target.valueAsNumber)}
                required={subsampleClip}
                disabled={!subsampleClip}
              />
            </div>
          </inputs.Group>
        </>
      )}
    </ui.Card>
  );
}

function ReviewClips({
  isLoading = false,
  numClips = 0,
  numRecordings = 0,
  dataset,
  onAdd,
}: {
  isLoading?: boolean;
  dataset?: types.Dataset;
  numClips?: number;
  numRecordings?: number;
  onAdd?: () => void;
}) {
  return (
    <ui.Card>
      <ui.H3>{t("Ringkasan")}</ui.H3>
      {dataset == null ? (
        <p className="text-stone-500">{t("Pilih kumpulan rekaman dulu.")}</p>
      ) : isLoading ? (
        <ui.Loading />
      ) : (
        <>
          <ul className="list-disc list-inside">
            <li>
              {t("Rekaman terpilih:")}{" "}
              <span className="text-emerald-500">{dataset.name}</span>
            </li>
            <li>
              {t("Berkas terpilih:")}{" "}
              <span className="text-emerald-500">{numRecordings}</span>
            </li>
            <li>
              {t("Klip yang ditambahkan:")}{" "}
              <span className="font-bold text-emerald-500">{numClips}</span>
            </li>
          </ul>
          <p className="text-stone-500">
            {t(
              "Kalau pilihan sudah pas, klik tombol di bawah untuk menambahkan klip ke proyek.",
            )}
          </p>
          <ui.Button onClick={onAdd}>{t("Tambahkan klip")}</ui.Button>
        </>
      )}
    </ui.Card>
  );
}
