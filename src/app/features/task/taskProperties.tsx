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
    value: "review",
    label: "Review",
    icon: HighlighterIcon,
  },
  {
    value: "pending",
    label: "Pending",
    icon: CircleIcon,
  },
  {
    value: "working",
    label: "Working",
    icon: StopwatchIcon,
    color: "orange",
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
  },
  {
    label: "Normal",
    value: "normal",
    icon: ArrowRightIcon,
    color: "blue",
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
    color: "orange",
  },
];
