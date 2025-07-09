import { getT } from "@/app/i18n";
import BackButton from "@/components/shared/BackButton";
import getApi from "@/lib/functions/api";
import { ListChecks, Tag as TagIcon, Text, UserCheck } from "lucide-react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface Tag {
  id: string;
  name: string;
  aliases: string[];
}

async function createEvent(formData: FormData) {
  "use server";
  const api = getApi();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const tagIds = formData.getAll("tagIds") as string[];
  const withAttendance = formData.get("withAttendance") === "on";
  const authorId = "0197dae1-3a79-7162-90a8-435348da2608";

  try {
    await api.eventService.create({
      form: {
        authorId,
        title,
        description,
        tagIds,
        withAttendance,
      },
    });
  } catch (e) {
    console.error("ErRoR ", e);
    // alert(e);
    throw e;
  }
  const lng = (formData.get("lng") as string) || "en";
  redirect(`/${lng}/events`);
}

export default async function CreateEventPage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const api = getApi();
  const response = await api.tagService.list({});
  const tags: Tag[] = response.tags ?? [];
  const { t } = await getT("common", { keyPrefix: "event-new" });

  return (
    <>
      <nav className="mb-4 flex items-center gap-2">
        <BackButton />
        <span className="text-lg font-semibold">{t("back")}</span>
      </nav>
      <main className="bg-base-100 flex min-h-[80vh] w-full items-center justify-center p-4">
        <div className="card bg-base-200 w-full max-w-4xl shadow-xl">
          <div className="card-body">
            <h1 className="card-title mb-1 text-2xl">{t("title")}</h1>
            <form className="w-full" action={createEvent}>
              <input type="hidden" name="lng" value={lng} />
              <div className="flex w-full flex-col gap-8 lg:flex-row">
                {/* Left column: main fields. */}
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
                      name="title"
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
                      name="description"
                      placeholder={t("placeholderDesc")}
                      required
                    />
                  </div>
                </div>
                {/* Visual delimiter for the desktop version. */}
                <div className="hidden flex-col justify-center lg:flex">
                  <div className="divider lg:divider-horizontal" />
                </div>
                {/* Right column: tags, checkbox. */}
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
                          className="btn btn-sm btn-outline flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            name="tagIds"
                            value={tag.id}
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
                        name="withAttendance"
                      />
                      <span className="label-text font-medium">
                        {t("labelAttendance")}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="card-actions mt-8 flex justify-end">
                <button className="btn btn-primary btn-wide" type="submit">
                  {t("button")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
