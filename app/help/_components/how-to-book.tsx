"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft,  } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

const HowToBook = () => {
    const {t} = useTranslation();

    const bookingProcessSteps = t("pageMetadata.bookingProcess.steps", { returnObjects: true }) as string[];
    const bookingTips = t("pageMetadata.bookingTips.tips", { returnObjects: true }) as string[];


    return (
        <div>
                  <main className="flex-grow container max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 pt-32 pb-12">
        <div className="flex flex-col gap-4 sm:flex-row items-start sm:items-center  justify-between">
          <h1 className="text-3xl font-bold md:mb-8 text-primary">
            {t("pageMetadata.mainTitle")}
          </h1>
          <Link href="/help">
            <Button variant="outline" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> {t("pageMetadata.backButton.label")}

            </Button>
          </Link>
        </div>
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>{t("pageMetadata.bookingProcess.title")}</CardTitle>
                <CardDescription>
                {t("pageMetadata.bookingProcess.description")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ol className="list-decimal list-inside space-y-2">
                {bookingProcessSteps?.map(
                    (step: string, index: number) => (
                    <li key={index}>{step}</li>
                    )
                )}
                </ol>
            </CardContent>
            </Card>


        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t("pageMetadata.bookingTips.title")}</CardTitle>
            <CardDescription>
            {t("pageMetadata.bookingProcess.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
                {bookingTips?.map(
                    (tip: string, index: number) => (
                    <li key={index}>{tip}</li>
                    )
                )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("pageMetadata.customerSupport.title")}</CardTitle>
            <CardDescription>
            {t("pageMetadata.customerSupport.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start justify-between gap-4">
            <p className="text-muted-foreground">
            {t("pageMetadata.customerSupport.content.text")}
            </p>
            <Button asChild>
              <Link href={"/help/contact-support"}>{t("pageMetadata.customerSupport.content.button.label")}</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
        </div>
    )
}

export default HowToBook
