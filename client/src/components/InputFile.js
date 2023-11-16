const InputFile = ({
  onDrop,
  emptyImage,
  wrongImage,
  loader,
  serialNumber,
}) => {
  return (
    <div className="flex-row items-center">
      <label
        htmlFor="serialNumber"
        className="border-[1.5px] border-[#00A1DE] border-dashed p-1.5 rounded w-fit mt-1 cursor-pointer"
      >
        Serial Number Image
      </label>
      <input
        className="hidden"
        type="file"
        onInput={onDrop}
        id="serialNumber"
        name="serialNumber"
        accept="image/*"
      />
      {emptyImage && <p className="text-red-600 ml-2">Please add image</p>}
      {wrongImage && <p className="text-red-600 ml-2">Not an image</p>}
      {loader && <p className="text-[#00A1E4] ml-2">Loading ...</p>}
      {serialNumber && (
        <img src="icons/tick.svg" alt="Uploaded" className="ml-2 w-8" />
      )}
    </div>
  );
};

export default InputFile;
