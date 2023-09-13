import { GlobeAmericasIcon } from "@heroicons/react/24/outline";
import { db, eq, items } from "~/backend/db";

const breadcrumbs = [{ id: 1, name: "The Best Collection", href: "/" }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default async function ProductPage({
  params,
}: {
  params: { id: number };
}) {
  const item = await db.query.items.findFirst({
    where: eq(items.id, params.id),
  });

  if (!item) {
    return <div className="mx-auto text-center">Item not found</div>;
  }
  return (
    <div className="bg-white">
      <div className="pb-16 pt-6 sm:pb-24">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <ol role="list" className="flex items-center space-x-4">
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-4 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    viewBox="0 0 6 20"
                    aria-hidden="true"
                    className="h-5 w-auto text-gray-300"
                  >
                    <path
                      d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">{item.name}</li>
          </ol>
        </nav>
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  {item.name}
                </h1>
                <p className="text-xl font-medium text-gray-900">
                  $
                  {parseFloat(item.price).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={"lg:col-span-2 lg:row-span-2 rounded-lg"}
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              {/* Product details */}
              <div className="mt-6">
                <div className="prose prose-sm mt-4 text-gray-500">
                  {item.description}
                </div>
              </div>

              <div className=" pt-4">
                <h2 className="text-sm font-medium text-gray-900">
                  Fabric &amp; Care
                </h2>

                <div className="prose prose-sm mt-4 text-gray-500">
                  <ul role="list">
                    {[
                      "Only the best materials",
                      "Ethically and locally made",
                      "Pre-washed and pre-shrunk",
                      "Machine wash cold with similar colors",
                    ].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <button className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-8 py-3 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                Add to cart
              </button>

              <section className="mt-10">
                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                    <dt>
                      <GlobeAmericasIcon
                        className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="mt-4 text-sm font-medium text-gray-900">
                        Ultra Hyper Mega Fast delivery
                      </span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500">
                      SquadJobs Shop delivers your items to you in under 5
                      minutes.
                    </dd>
                  </div>
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
