import classNames from "classnames";
import { useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";

import { EditIcon } from "@/lib/components/icons";
import { Input, TextArea } from "@/lib/components/inputs";

import { locale, localized, t } from "@/lib/i18n";

/** RIMBA: text values in the interface language, other values as before. */
function shown(value: string | number | Date | undefined): string {
  if (typeof value === "string") return localized(value);
  if (value instanceof Date)
    return value.toLocaleString(locale(), {
      dateStyle: "medium",
      timeStyle: "short",
    });
  return value?.toLocaleString() ?? "";
}

/** RIMBA: long text is folded to a few lines with a show more/less toggle. */
function Folded({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const long = text.length > 280 || text.split("\n").length > 6;
  return (
    <div className="min-w-0">
      <p
        className={classNames(
          "whitespace-pre-wrap break-words",
          long && !open && "line-clamp-6",
        )}
      >
        {text}
      </p>
      {long && (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="mt-1 text-xs font-medium text-emerald-700 hover:underline dark:text-emerald-400"
        >
          {open ? t("Ringkas") : t("Tampilkan semua")}
        </button>
      )}
    </div>
  );
}

/**
 * A component to display data within a description list (<dd>) element.
 */
export function DescriptionData({
  children,
  className,
  ...rest
}: {
  /** The content to be displayed within the data element. */
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  return (
    <dd
      className={classNames(
        "mt-1 w-full text-sm leading-6 text-stone-800 dark:text-stone-300",
        className,
      )}
      {...rest}
    >
      {children}
    </dd>
  );
}

/**
 * A component to display a term within a description list (<dt>) element.
 */
export function DescriptionTerm({
  children,
  className,
  ...rest
}: {
  /** The content to be displayed within the term element. */
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  return (
    <dt
      className={classNames(
        "w-full text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400",
        className,
      )}
      {...rest}
    >
      {children}
    </dt>
  );
}

/**
 * An editable description data component that allows for inline editing of
 * various data types (text, textarea, number, date, email).
 */
export function EditableDescriptionData<T extends string | number | Date>({
  type,
  value,
  onChange,
}: {
  /** The initial value of the data to be displayed and edited. */
  value: T | undefined;
  /** The type of input element to use for editing ('text', 'textarea',
   * 'number', 'date', 'email'). */
  type?: "text" | "textarea" | "number" | "date" | "email";
  /** A callback function that is triggered when the edited value is
   * confirmed (e.g., on Enter key press or blur). */
  onChange?: (value: T) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState<T | null>(value ?? null);

  if (!editing) {
    return (
      <DescriptionData className="flex flex-row gap-3 justify-between items-start">
        {/* RIMBA: show one language; editing shows both (see localized) */}
        <Folded text={shown(value)} />
        <button
          type="button"
          title={t("Ubah")}
          onClick={() => setEditing(true)}
          className="flex-none p-1 rounded-md text-stone-400 hover:bg-stone-100 hover:text-emerald-700 dark:hover:bg-stone-700 dark:hover:text-emerald-400"
        >
          <EditIcon className="w-4 h-4" />
        </button>
      </DescriptionData>
    );
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      setEditing(false);
      if (localValue != null) {
        onChange?.(localValue);
      }
    }

    if (e.key === "Escape") {
      setEditing(false);
      if (value != null) {
        setLocalValue(value);
      }
    }
  };

  const onBlur = () => {
    setEditing(false);
    if (value === undefined) return;
    setLocalValue(value);
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLocalValue(e.target.value as T);
  };

  switch (type) {
    case "email":
    case "text":
      return (
        <DescriptionData className="flex flex-row justify-between">
          <Input
            type={type}
            value={localValue as string}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onChange={onChangeHandler}
            autoFocus
          />
        </DescriptionData>
      );
    case "textarea":
      return (
        <DescriptionData className="flex flex-row justify-between">
          <TextArea
            value={localValue as string}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onChange={onChangeHandler}
            autoFocus
          />
        </DescriptionData>
      );
    case "number":
      return (
        <DescriptionData className="flex flex-row justify-between">
          <Input
            type="number"
            value={localValue as number}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onChange={onChangeHandler}
            autoFocus
          />
        </DescriptionData>
      );
    case "date":
      return (
        <DescriptionData className="flex flex-row justify-between">
          <Input
            type="date"
            value={
              localValue ? (localValue as Date).toISOString().split("T")[0] : ""
            }
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onChange={onChangeHandler}
            autoFocus
          />
        </DescriptionData>
      );
    default:
      return null;
  }
}

/**
 * A description component that combines a term (\<dt\>) and data (\<dd\>) for
 * displaying information. It can be used in either a read-only or editable
 * mode.
 */
export default function Description<T extends string | number | Date>({
  name,
  value,
  editable = false,
  type = "text",
  onChange,
}: {
  /** The label or term to describe the data. */
  name: string;
  /** The data to be displayed. */
  value: T | undefined;
  /** Whether the data should be editable (default: false). */
  editable?: boolean;
  /** The type of input element to use for editing if editable (default:
   * 'text'). */
  type: "text" | "textarea" | "number" | "date" | "email";
  /** A callback function to handle changes when in editable mode. */
  onChange?: (value: T) => void;
}) {
  if (!editable) {
    return (
      <div className="flex flex-col w-full">
        <DescriptionTerm>{name}</DescriptionTerm>
        <DescriptionData>{shown(value)}</DescriptionData>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <DescriptionTerm>{name}</DescriptionTerm>
      <EditableDescriptionData value={value} type={type} onChange={onChange} />
    </div>
  );
}

Description.Term = DescriptionTerm;
Description.Data = DescriptionData;
