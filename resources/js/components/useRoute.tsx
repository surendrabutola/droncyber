import { route as ziggyRoute } from "ziggy-js";
import { usePage } from "@inertiajs/react";
import type { PageProps } from "@inertiajs/core";

interface ZiggyPageProps extends PageProps {
  ziggy: any;
}

export default function useRoute() {
  const { ziggy } = usePage<ZiggyPageProps>().props;

  return (name: string, params: Record<string, any> = {}, absolute = true) =>
    ziggyRoute(name, params, absolute, ziggy);
}
