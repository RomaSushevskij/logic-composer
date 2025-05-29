import type { ReactNode } from "react";
import Accordion, { type AccordionProps } from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const GroupAccordion = ({
  children,
  titleSlot,
  ...props
}: AccordionProps & { titleSlot: ReactNode }) => {
  return (
    <Accordion {...props}>
      <AccordionSummary component={"div"} expandIcon={<ExpandMoreIcon />}>
        {titleSlot}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
