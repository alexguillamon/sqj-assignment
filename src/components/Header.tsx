"use client";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const navigation = {
  categories: [
    {
      name: "Techies",
      clothing: [
        [
          { name: "Pants", href: "#" },
          { name: "Denim", href: "#" },
          { name: "Sweaters", href: "#" },
          { name: "T-Shirts", href: "#" },
        ],
        [
          { name: "Jackets", href: "#" },
          { name: "Activewear", href: "#" },
          { name: "Shorts", href: "#" },
          { name: "Swimwear", href: "#" },
        ],
      ],
      accessories: [
        { name: "Shoes", href: "#" },
        { name: "Socks", href: "#" },
        { name: "Hats", href: "#" },
      ],
      categories: [
        { name: "New Arrivals", href: "#" },
        { name: "Sale", href: "#" },
      ],
    },
    {
      name: "Non-Techies",
      clothing: [
        [
          { name: "Pants", href: "#" },
          { name: "Jackets", href: "#" },
          { name: "T-Shirts", href: "#" },
          { name: "Hoodies", href: "#" },
        ],
        [
          { name: "Vests", href: "#" },
          { name: "Outdoors", href: "#" },
          { name: "Capes", href: "#" },
        ],
      ],
      accessories: [
        { name: "Watches", href: "#" },
        { name: "Sunglasses", href: "#" },
      ],
      categories: [
        { name: "Just Added", href: "#" },
        { name: "Clearance", href: "#" },
      ],
    },
  ],
  other: [{ name: "Admin", href: "#" }],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  return (
    <div className="bg-white">
      <header className="relative bg-white z-10">
        <nav aria-label="Top" className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 px-4 pb-14 sm:px-0 sm:pb-0">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex flex-1">
                <a href="#" className="flex flex-row">
                  <span className="sr-only">SquadJobs Shop</span>
                  <img className="h-8 w-auto" src="/squadjobs-red.svg" alt="" />
                  <p className="mt-auto ml-0.5 font-bold italic">shop</p>
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="absolute inset-x-0 bottom-0 sm:static sm:flex-1 sm:self-stretch">
                <div className="flex h-14 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0">
                  {navigation.categories.map((category, categoryIdx) => (
                    <Popover key={categoryIdx} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-gray-500 sm:text-sm">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                  <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 pb-12 pt-10 md:grid-cols-2 lg:gap-x-8">
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:gap-x-8">
                                      <div>
                                        <p
                                          id="clothing-heading"
                                          className="font-medium text-gray-900"
                                        >
                                          Clothing
                                        </p>
                                        <div className="mt-4 border-t border-gray-200 pt-6 sm:grid sm:grid-cols-2 sm:gap-x-6">
                                          <ul
                                            role="list"
                                            aria-labelledby="clothing-heading"
                                            className="space-y-6 sm:space-y-4"
                                          >
                                            {category.clothing[0]!.map(
                                              (item) => (
                                                <li
                                                  key={item.name}
                                                  className="flex"
                                                >
                                                  <a
                                                    href={item.href}
                                                    className="hover:text-gray-800"
                                                  >
                                                    {item.name}
                                                  </a>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                          <ul
                                            role="list"
                                            aria-label="More clothing"
                                            className="mt-6 space-y-6 sm:mt-0 sm:space-y-4"
                                          >
                                            {category.clothing[1]!.map(
                                              (item) => (
                                                <li
                                                  key={item.name}
                                                  className="flex"
                                                >
                                                  <a
                                                    href={item.href}
                                                    className="hover:text-gray-800"
                                                  >
                                                    {item.name}
                                                  </a>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:gap-x-8">
                                      <div>
                                        <p
                                          id="accessories-heading"
                                          className="font-medium text-gray-900"
                                        >
                                          Accessories
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby="accessories-heading"
                                          className="mt-4 space-y-6 border-t border-gray-200 pt-6 sm:space-y-4"
                                        >
                                          {category.accessories.map((item) => (
                                            <li
                                              key={item.name}
                                              className="flex"
                                            >
                                              <a
                                                href={item.href}
                                                className="hover:text-gray-800"
                                              >
                                                {item.name}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div>
                                        <p
                                          id="categories-heading"
                                          className="font-medium text-gray-900"
                                        >
                                          Categories
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby="categories-heading"
                                          className="mt-4 space-y-6 border-t border-gray-200 pt-6 sm:space-y-4"
                                        >
                                          {category.categories.map((item) => (
                                            <li
                                              key={item.name}
                                              className="flex"
                                            >
                                              <a
                                                href={item.href}
                                                className="hover:text-gray-800"
                                              >
                                                {item.name}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.other.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="flex flex-1 items-center justify-end">
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-8">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
