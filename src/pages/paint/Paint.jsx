import React, { useEffect, useState } from "react";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";
import { useDispatch } from "react-redux";
import { hideLoading } from "../../redux/slice/loading.slice";

const Paint = () => {
  const [imageUrl, setImageUrl] = useState("/paper.jpg");
  const dispatch = useDispatch();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async (editedImageObject, designState) => {
    console.log("saved", editedImageObject, designState);
  };

  useEffect(() => {
    dispatch(hideLoading());
  }, []);

  return (
    <div className="h-[95vh] bg-[#2B2929]">
      <div className="h-[85vh] py-5">
        <div className="px-3 py-5">
          <label
            for="fileInput"
            className="relative cursor-pointer bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-sm text-xs">
            Upload File
            <input
              id="fileInput"
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <FilerobotImageEditor
          source={imageUrl}
          theme={{
            palette: {
              "bg-primary": "#2B2929",
              "bg-secondary": "#2B2929",
            },
          }}
          savingPixelRatio={2}
          previewPixelRatio={2}
          annotationsCommon={{
            fill: "#2B2929",
          }}
          Text={{
            text: "...",
          }}
          Rotate={{ angle: 90, componentType: "slider" }}
          Crop={{
            presetsItems: [
              {
                titleKey: "classicTv",
                descriptionKey: "4:3",
                ratio: 4 / 3,
              },
              {
                titleKey: "cinemascope",
                descriptionKey: "21:9",
                ratio: 21 / 9,
              },
            ],
            presetsFolders: [
              {
                titleKey: "socialMedia",
                groups: [
                  {
                    titleKey: "facebook",
                    items: [
                      {
                        titleKey: "profile",
                        width: 180,
                        height: 180,
                        descriptionKey: "fbProfileSize",
                      },
                      {
                        titleKey: "coverPhoto",
                        width: 820,
                        height: 312,
                        descriptionKey: "fbCoverPhotoSize",
                      },
                    ],
                  },
                ],
              },
            ],
          }}
          tabsIds={[
            TABS.ANNOTATE,
            TABS.ADJUST,
            TABS.FILTERS,
            TABS.FINETUNE,
            TABS.RESIZE,
          ]}
          defaultTabId={TABS.ANNOTATE}
          defaultToolId={TOOLS.PEN}
          defaultSavedImageQuality={1.0}
          onSave={(file) => handleSaveImage(file)}
        />
      </div>
    </div>
  );
};

export default Paint;
