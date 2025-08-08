import React from "react";
import { cn } from "@/common/lib/utils.ts";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {
  isLoading: boolean;
};

const AtomicLoading = ({ isLoading }: Props) => {
  return (
    <div className={cn("animate-spin", !isLoading && "hidden")}>
      <AiOutlineLoading className={"size-5"} />
    </div>
  );
};
export default React.memo(AtomicLoading);
