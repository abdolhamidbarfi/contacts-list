import ContactCard from "@/features/contacts/ContactCard";
import Header from "@/components/Header";
import { Row } from "@/components/ui/row";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <>
      <ScrollArea dir="rtl" className="w-full h-full">
        <Row direction="column" className="mt-20 mb-10 gap-y-3 ">
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
          <ContactCard name="حمید" phone="09392752406" />
        </Row>
      </ScrollArea>
    </>
  );
}
