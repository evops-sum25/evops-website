"use client";
import { useT } from "@/app/i18n/client";
import BackButton from "@/components/shared/BackButton";
import { TagServiceListResponse } from "@/gen/evops/api/v1/api_pb";
import getApi from "@/lib/api/api";
import { createEvent } from "@/lib/api/events/createEvent";
import {
  ArrowLeft,
  ArrowRight,
  ListChecks,
  Tag as TagIcon,
  Text,
  Upload,
  UserCheck,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Tag {
  id: string;
  name: string;
  aliases: string[];
}

interface FormData {
  title: string;
  description: string;
  tagIds: string[];
  withAttendance: boolean;
  imageFile?: File;
  imagePreview?: string;
}

export default function CreateEventPage() {
  const params = useParams();
  const api = getApi();
  const { t } = useT("common", { keyPrefix: "event-new" });
  const [response, setResponse] = useState<TagServiceListResponse | {}>({});
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    tagIds: [],
    withAttendance: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      const t = await api.tagService.list({});
      if (t) {
        setResponse(t);
      }
    };
    fetchTags();
  }, []);

  const tags: Tag[] = (response as TagServiceListResponse).tags ?? [];
  const lng = params.lng as string;

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagToggle = (tagId: string) => {
    setFormData((prev) => ({
      ...prev,
      tagIds: prev.tagIds.includes(tagId)
        ? prev.tagIds.filter((id) => id !== tagId)
        : [...prev.tagIds, tagId],
    }));
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for server action
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append(
        "withAttendance",
        formData.withAttendance ? "on" : "off",
      );
      submitData.append("lng", lng);

      formData.tagIds.forEach((tagId) => {
        submitData.append("tagIds", tagId);
      });

      // If we have an image file, append it directly
      if (formData.imageFile) {
        submitData.append("imageFile", formData.imageFile);
      }

      await createEvent(submitData);
    } catch (error) {
      console.error("Error creating event:", error);
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = formData.title.trim() && formData.description.trim();
  // const isStep2Valid = !formData.imageFile; // Allow submission without image

  return (
    <>
      <nav className="mb-4 flex items-center gap-2">
        <BackButton />
        <span className="text-lg font-semibold">{t("back")}</span>
      </nav>

      <main className="bg-base-100 flex min-h-[80vh] w-full items-center justify-center p-4">
        <div className="card bg-base-200 w-full max-w-4xl shadow-xl">
          <div className="card-body">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <span
                  className={`text-sm ${step >= 1 ? "text-primary" : "text-base-content/50"}`}
                >
                  {t("progress.step1")}
                </span>
                <span
                  className={`text-sm ${step >= 2 ? "text-primary" : "text-base-content/50"}`}
                >
                  {t("progress.step2")}
                </span>
              </div>
              <div className="bg-base-300 h-2 w-full rounded-full">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${step === 1 ? "50%" : "100%"}` }}
                ></div>
              </div>
            </div>

            <h1 className="card-title mb-1 text-2xl">
              {step === 1 ? t("step1.title") : t("step2.title")}
            </h1>
            <p className="text-base-content/70 mb-6">
              {step === 1 ? t("step1.subtitle") : t("step2.subtitle")}
            </p>

            <form
              className="w-full"
              onSubmit={step === 1 ? handleNext : handleSubmit}
            >
              {step === 1 ? (
                /* Step 1: Event Details */
                <div className="flex w-full flex-col gap-8 lg:flex-row">
                  {/* Left column: main fields */}
                  <div className="flex flex-1 flex-col gap-6">
                    <div className="form-control">
                      <label className="label gap-2">
                        <Text className="text-primary h-5 w-5" />
                        <span className="label-text font-medium">
                          {t("title")}
                        </span>
                      </label>
                      <input
                        className="input input-bordered"
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        placeholder={t("placeholderTitle")}
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label gap-2">
                        <ListChecks className="text-primary h-5 w-5" />
                        <span className="label-text font-medium">
                          {t("description")}
                        </span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        placeholder={t("placeholderDesc")}
                        required
                      />
                    </div>
                  </div>

                  {/* Visual delimiter for desktop */}
                  <div className="hidden flex-col justify-center lg:flex">
                    <div className="divider lg:divider-horizontal" />
                  </div>

                  {/* Right column: tags, checkbox */}
                  <div className="flex flex-1 flex-col gap-6">
                    <div className="form-control">
                      <label className="label gap-2">
                        <TagIcon className="text-primary h-5 w-5" />
                        <span className="label-text font-medium">
                          {t("labelTags")}
                        </span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <label
                            key={tag.id}
                            className={`btn btn-sm btn-outline flex cursor-pointer items-center gap-2 ${
                              formData.tagIds.includes(tag.id)
                                ? "btn-primary"
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.tagIds.includes(tag.id)}
                              onChange={() => handleTagToggle(tag.id)}
                              className="checkbox checkbox-xs"
                            />
                            {tag.name}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="form-control mt-2 flex-row items-center gap-2">
                      <label className="flex cursor-pointer items-center gap-2">
                        <UserCheck className="text-primary h-5 w-5" />
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={formData.withAttendance}
                          onChange={(e) =>
                            handleInputChange(
                              "withAttendance",
                              e.target.checked,
                            )
                          }
                        />
                        <span className="label-text font-medium">
                          {t("labelAttendance")}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                /* Step 2: Image Upload */
                <div className="flex flex-col gap-6">
                  <div className="form-control">
                    <label className="label gap-2">
                      <Upload className="text-primary h-5 w-5" />
                      <span className="label-text font-medium">
                        {t("step2.uploadLabel")}
                      </span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(file);
                        }
                      }}
                      className="file-input file-input-bordered w-full"
                    />
                    <div className="label">
                      <span className="label-text-alt">
                        {t("step2.uploadPlaceholder")}
                      </span>
                      <span className="label-text-alt text-base-content/50">
                        (Optional)
                      </span>
                    </div>
                  </div>

                  {formData.imagePreview && (
                    <div className="form-control">
                      <label className="label gap-2">
                        <span className="label-text font-medium">
                          {t("step2.preview")}
                        </span>
                      </label>
                      <div className="relative">
                        <img
                          src={formData.imagePreview}
                          alt="Preview"
                          className="w-full max-w-md rounded-lg shadow-lg"
                        />
                      </div>
                      <div className="label">
                        <span className="label-text-alt text-base-content/70">
                          {t("step2.note")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="card-actions mt-8 flex justify-between">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn btn-outline gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                )}
                <div className="ml-auto">
                  {step === 1 ? (
                    <button
                      type="submit"
                      className="btn btn-primary gap-2"
                      disabled={!isStep1Valid}
                    >
                      {t("step1.next")}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary btn-wide"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        t("step2.create")
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
