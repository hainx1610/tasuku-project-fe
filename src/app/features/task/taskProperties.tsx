import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  // QuestionMarkCircledIcon,
  ArchiveIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { HighlighterIcon } from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "pending",
    label: "Pending",
    icon: CircleIcon,
    color: "#46C2CB",
  },
  {
    value: "working",
    label: "Working",
    icon: StopwatchIcon,
    color: "orange",
  },
  {
    value: "review",
    label: "Review",
    icon: HighlighterIcon,
    color: "#6D67E4",
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
    color: "green",
  },
  {
    value: "archived",
    label: "Archived",
    icon: ArchiveIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
    color: "#C4B6B6",
  },
  {
    label: "Normal",
    value: "normal",
    icon: ArrowRightIcon,
    color: "#0766AD",
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
    color: "#C74B50",
  },
];
