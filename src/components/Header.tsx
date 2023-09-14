"use client";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const path = usePathname();
  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 px-4 pb-14 sm:px-0 sm:pb-0">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex flex-1">
                <Link href="/" className="flex flex-row">
                  <span className="sr-only">SquadJobs Shop</span>
                  <Image
                    className="w-32  h-auto md:w-44"
                    width={300}
                    height={100}
                    src="/squadjobs-red.svg"
                    alt="SquadJobs Shop Logo"
                  />
                  <p className="mt-auto ml-0.5 font-bold italic">shop</p>
                </Link>
              </div>

              <div className="absolute inset-x-0 bottom-0 sm:static sm:flex-1 sm:self-stretch">
                <div className="flex h-14 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0">
                  <Link
                    href={"/"}
                    prefetch={false}
                    className={classNames(
                      path === "/"
                        ? "border-primary-600 text-primary-600"
                        : "border-transparent text-gray-700 hover:text-gray-800",
                      "relative -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                    )}
                  >
                    {"The Best Collection"}
                  </Link>
                  <Link
                    href={"/admin"}
                    prefetch={false}
                    className={classNames(
                      path === "/admin"
                        ? "border-primary-600 text-primary-600"
                        : "border-transparent text-gray-700 hover:text-gray-800",
                      "relative -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                    )}
                  >
                    {"Admin"}
                  </Link>
                </div>
              </div>

              <div className="flex md:flex-1 items-center justify-end">
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
