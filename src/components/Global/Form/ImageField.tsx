"use client";

import { useDropzone } from "react-dropzone";

type Props = {
  value?: File | string;
  onChange: (file?: File) => void;
  placeholder?: string;
};

export default function ImageField({ value, onChange, placeholder }: Props) {
  const { getRootProps, getInputProps } = useDropzone({ accept: { "image/*": [] }, maxFiles: 1, onDrop: (files) => onChange(files[0]) });

  const removeImage = () => {
    onChange(undefined);
  };

  return (
    <div {...getRootProps()}>
        <p className="text-center text-sm mb-2">{placeholder? placeholder : "Select an image"}</p>
        <div className="border-2 border-dashed rounded p-4 text-center cursor-pointer">
            <input {...getInputProps()} />
            {value ? (
                <div>
                    <img
                    src={typeof value === "string" ? value : URL.createObjectURL(value)}
                    alt="preview"
                    className="mx-auto max-h-48 rounded"
                    />

                    <p className="mt-2 text-sm text-center"> {value instanceof File ? value.name : "Current image"} </p>

                    <button onClick={removeImage}
                     className="text-xs mt-2 px-4 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 transition-colors">
                      Remove
                    </button>
                </div>

            )  : (
                <p>Drag & Drop image here or Click to select image</p>
            )}
      </div>
    </div>
  );
}
