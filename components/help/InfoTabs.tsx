import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const InfoTabs = () => {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue="general" className="mb-12">
      <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-max">
        <TabsTrigger value="general">{t("infoTabs.generalInfo")}</TabsTrigger>
        <TabsTrigger value="booking">
          {t("infoTabs.bookingProcess")}
        </TabsTrigger>
        <TabsTrigger value="manage">{t("infoTabs.manageBookings")}</TabsTrigger>
        <TabsTrigger value="faqs">{t("infoTabs.faqs")}</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>{t("infoTabs.generalTitle")}</CardTitle>
            <CardDescription>
              {t("infoTabs.generalDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  {t("infoTabs.aboutService")}
                </AccordionTrigger>
                <AccordionContent>
                  {t("infoTabs.aboutServiceContent")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  {t("infoTabs.routesDestinations")}
                </AccordionTrigger>
                <AccordionContent>
                  {t("infoTabs.routesDestinationsContent")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  {t("infoTabs.luggagePolicy")}
                </AccordionTrigger>
                <AccordionContent>
                  {t("infoTabs.luggagePolicyContent")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>{t("infoTabs.petPolicy")}</AccordionTrigger>
                <AccordionContent>
                  {t("infoTabs.petPolicyContent")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="booking">
        <Card>
          <CardHeader>
            <CardTitle>{t("infoTabs.bookingTitle")}</CardTitle>
            <CardDescription>
              {t("infoTabs.bookingDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>{t("infoTabs.howToBook")}</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-2">
                    {Object.keys(
                      t("infoTabs.howToBookSteps", { returnObjects: true })
                    ).map((step) => (
                      <li key={step}>{t(`infoTabs.howToBookSteps.${step}`)}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  {t("infoTabs.paymentMethods")}
                </AccordionTrigger>
                <AccordionContent>
                  {t("infoTabs.paymentMethodsContent.title")}
                  <ul className="list-disc list-inside mt-2">
                    {Object.keys(
                      t("infoTabs.paymentMethodsContent.methods", {
                        returnObjects: true,
                      })
                    ).map((method) => (
                      <li key={method}>
                        {t(`infoTabs.paymentMethodsContent.methods.${method}`)}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  {t("infoTabs.seatSelection")}
                </AccordionTrigger>
                <AccordionContent>
                  {t("infoTabs.seatSelectionContent")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  {t("infoTabs.groupBookings")}
                </AccordionTrigger>
                <AccordionContent>
                  {t("infoTabs.groupBookingsContent")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="manage">
        <Card>
          <CardHeader>
            <CardTitle>{t("infoTabs.manageTitle")}</CardTitle>
            <CardDescription>{t("infoTabs.manageDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  {t("infoTabs.modifyBooking")}
                </AccordionTrigger>
                <AccordionContent>
                  {t("infoTabs.modifyBookingSteps.intro")}
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    {Object.keys(
                      t("infoTabs.modifyBookingSteps", { returnObjects: true })
                    )
                      .filter((key) => !isNaN(Number(key)))
                      .map((step) => (
                        <li key={step}>
                          {t(`infoTabs.modifyBookingSteps.${step}`)}
                        </li>
                      ))}
                  </ol>
                  {t("infoTabs.modifyBookingSteps.note")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  {t("infoTabs.cancellationPolicy")}
                </AccordionTrigger>
                <AccordionContent>
                  {t("infoTabs.cancellationPolicyContent.intro")}
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {Object.keys(
                      t("infoTabs.cancellationPolicyContent.policies", {
                        returnObjects: true,
                      })
                    ).map((policy) => (
                      <li key={policy}>
                        {t(
                          `infoTabs.cancellationPolicyContent.policies.${policy}`
                        )}
                      </li>
                    ))}
                  </ul>
                  {t("infoTabs.cancellationPolicyContent.instructions")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  {t("infoTabs.refundProcess")}
                </AccordionTrigger>
                <AccordionContent>
                  {t("infoTabs.refundProcessContent")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>{t("infoTabs.lostTicket")}</AccordionTrigger>
                <AccordionContent>
                  {t("infoTabs.lostTicketContent")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="faqs">
        <Card>
          <CardHeader>
            <CardTitle>{t("infoTabs.faqsTitle")}</CardTitle>
            <CardDescription>{t("infoTabs.faqsDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>{t("infoTabs.arrivalTime")}</AccordionTrigger>
                <AccordionContent>
                  {t("infoTabs.arrivalTimeContent")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>{t("infoTabs.changeName")}</AccordionTrigger>
                <AccordionContent>
                  {t("infoTabs.changeNameContent")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>{t("infoTabs.missBus")}</AccordionTrigger>
                <AccordionContent>
                  {t("infoTabs.missBusContent")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  {t("infoTabs.powerOutlets")}
                </AccordionTrigger>
                <AccordionContent>
                  {t("infoTabs.powerOutletsContent")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default InfoTabs;
