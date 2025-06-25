"use client";

import getApi from "@/lib/functions/api";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

interface Tag {
  id: string;
  name: string;
  aliases: string[];
}

export default function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [withAttendance, setWithAttendance] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const api = getApi();
        const response = await api.tagService.list({});
        setTags(response.tags ?? []);
      } catch (e) {
        setError("Не удалось загрузить теги");
      }
    };
    fetchTags();
  }, []);

  const handleImageUrlChange = (idx: number, value: string) => {
    setImageUrls((prev) => prev.map((url, i) => (i === idx ? value : url)));
  };

  const addImageUrlField = () => setImageUrls((prev) => [...prev, ""]);
  const removeImageUrlField = (idx: number) =>
    setImageUrls((prev) => prev.filter((_, i) => i !== idx));

  const handleTagSelect = (id: string) => {
    setTagIds((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const api = getApi();
      await api.eventService.create({
        form: {
          title,
          description,
          authorId: "0197a6b7-5974-7ac3-ab48-39514390261b",
          imageUrls: imageUrls.filter(Boolean),
          tagIds: tagIds,
          withAttendance: withAttendance,
        },
      });
      setSuccess(true);
      setTitle("");
      setDescription("");
      setImageUrls([""]);
      setTagIds([]);
      setWithAttendance(false);
    } catch (e) {
      setError("Ошибка при создании ивента");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav>
        <Link href="../" className="btn btn-ghost btn-circle">
          <ChevronLeft />
        </Link>
      </nav>
      <main className="main-layout w-full justify-center p-4">
        <form
          className="flex w-full max-w-2xl flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <fieldset className="fieldset flex flex-col gap-4">
            <legend className="fieldset-legend text-lg">Создать ивент</legend>
            {success && (
              <div className="alert alert-success">Ивент успешно создан!</div>
            )}
            {error && <div className="alert alert-error">{error}</div>}
            <input
              className="input input-bordered"
              type="text"
              placeholder="Заголовок"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="textarea textarea-bordered"
              placeholder="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div>
              <label className="mb-2 block">Изображения</label>
              {imageUrls.map((url, idx) => (
                <div key={idx} className="mb-2 flex gap-2">
                  <input
                    className="input input-bordered flex-1"
                    type="url"
                    placeholder="Image URL"
                    value={url}
                    onChange={(e) => handleImageUrlChange(idx, e.target.value)}
                  />
                  {imageUrls.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-error"
                      onClick={() => removeImageUrlField(idx)}
                    >
                      -
                    </button>
                  )}
                  {idx === imageUrls.length - 1 && (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={addImageUrlField}
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div>
              <label className="mb-2 block">Теги</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    type="button"
                    key={tag.id}
                    className={`btn btn-sm ${tagIds.includes(tag.id) ? "btn-primary" : "btn-outline"}`}
                    onClick={() => handleTagSelect(tag.id)}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={withAttendance}
                onChange={(e) => setWithAttendance(e.target.checked)}
              />
              С регистрацией на посещение
            </label>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Создание..." : "Создать ивент"}
            </button>
          </fieldset>
        </form>
      </main>
    </>
  );
}
