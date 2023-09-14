"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Item } from "~/backend/db";
import ky from "ky";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { UploadDropzone } from "~/utils/uploadthing";
import Image from "next/image";
import { state$ } from "../app/admin/adminState";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type StatusType = "idle" | "loading" | "error" | "success";

type Inputs = {
  name: string;
  price: number;
  description: string;
};

const isUrl = z.string().url();

export default function EditForm({ item }: { item?: Item }) {
  const [imageUrl, setImageUrl] = useState<string>(item?.imageUrl ?? "");
  const [status, setStatus] = useState<StatusType>("idle");
  const router = useRouter();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();

  const queryClient = useQueryClient();

  // Mutations
  const postItem = useMutation({
    mutationFn: (data: Inputs) =>
      ky
        .post("/api/items", {
          json: { ...data, imageUrl },
        })
        .json<{ data: Item }>(),
    onSuccess: (res) => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ["items"] });
      state$.items.set([...state$.items.get(), res.data]);
      router.push("/admin");
    },
  });

  function onSubmit(data: Inputs) {
    if (item) {
      putItem(item.id, data);
    } else {
      postItem.mutate(data);
    }
  }

  // async function postItem(data: Inputs) {
  //   try {
  //     setStatus("loading");
  //     const res = await ky
  //       .post("/api/items", {
  //         json: { ...data, imageUrl },
  //       })
  //       .json<{ data: Item }>();

  //     if (res.data) {
  //       setStatus("success");

  //       console.log(res.data);

  //       state$.items.set([...state$.items.get(), res.data]);

  //       router.push("/admin");
  //     }
  //   } catch (error: any) {
  //     setStatus("error");
  //     if (error.name === "HTTPError") {
  //       const errorJson = await error.response.json();
  //       console.log(errorJson);
  //     }
  //   }
  // }

  async function putItem(id: number, data: Inputs) {
    try {
      setStatus("loading");
      const res = await ky
        .put(`/api/items/${id}`, {
          json: { ...data, imageUrl },
        })
        .json<{ data: string }>();

      if (res.data) {
        setStatus("success");

        router.push("/admin");
      }
    } catch (error: any) {
      setStatus("error");
      if (error.name === "HTTPError") {
        const errorJson = await error.response.json();
        console.log(errorJson);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {item ? "Edit " + item.name : "Add Item"}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 sm:max-w-md">
                  <input
                    type="text"
                    id="name"
                    defaultValue={item?.name ?? ""}
                    {...register("name", { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  id="price"
                  {...register("price", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                  defaultValue={item?.price ?? ""}
                  aria-describedby="price-currency"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="price-currency"
                  >
                    USD
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                What should this amazing SquadJobs product be described as?
              </p>
              <div className="mt-2">
                <textarea
                  id="description"
                  rows={3}
                  {...register("description", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  defaultValue={item?.description ?? ""}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Image
              </label>
              {isUrl.safeParse(imageUrl).success && (
                <Image
                  src={imageUrl}
                  height={400}
                  width={400}
                  alt={"Front of men's Basic Tee in black."}
                  className="h-auto w-80 object-cover object-center md:h-60 md:w-auto"
                />
              )}

              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (!res || res.length === 0) {
                    console.log("no res");
                    setStatus("error");
                    return;
                  }
                  setImageUrl(res[0]?.url ?? "");
                }}
                config={{ mode: "auto" }}
              />
              {/* <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          disabled={Object.keys(errors).length > 0}
        >
          {item ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
}
