'use client';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as locale from '@mui/x-date-pickers/locales';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali/AdapterDateFnsJalali';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { arSA as arSAAdapter, enUS as enUSAdapter, fajalaliIR as faJalaliIRAdapter } from 'date-fns-jalali/locale';
import type { ReactNode } from 'react';

interface IProps {
    children: ReactNode;
    language?: 'fa' | 'ar' | 'en';
    calendar?: 'shamsi' | 'qamari' | 'miladi';
    fullMonth?: boolean;
}

const persianFullMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

// const arabicLocaleText: Partial<locale.PickersLocaleText<unknown>> = {
//     okButtonLabel: 'موافق',
//     cancelButtonLabel: 'الغاء',
//     clearButtonLabel: 'مسح',
//     datePickerToolbarTitle: 'اختر التاريخ',
//     dateTimePickerToolbarTitle: 'اختر التاريخ والوقت',
//     timePickerToolbarTitle: 'اختر الوقت',
//     dateRangePickerToolbarTitle: 'اختر نطاق التاريخ',
// }

const languageToLocaleText: Record<NonNullable<IProps['language']>, any> = {
    fa: locale.faIR,
    ar: locale.enUS,
    en: locale.enUS
}
const calendarToAdapter: Record<NonNullable<IProps['calendar']>, any> = {
    shamsi: AdapterDateFnsJalali,
    qamari: AdapterDateFns,
    miladi: AdapterDateFns
}
const languageToAdapterLocale: Record<NonNullable<IProps['language']>, any> = {
    fa: faJalaliIRAdapter,
    ar: arSAAdapter,
    en: enUSAdapter
}

export const CustomLocalizationProvider = ({ language = 'fa', calendar = 'shamsi',fullMonth = true, ...props }: IProps) => {
    
    return (
        <LocalizationProvider
            dateAdapter={calendarToAdapter[calendar]}
            localeText={{
                ...languageToLocaleText[language].components.MuiLocalizationProvider.defaultProps.localeText,
                ...(language === 'fa' && { okButtonLabel: 'تایید' }),
                // ...(language === 'ar' && arabicLocaleText),
            }}
            adapterLocale={{
                ...languageToAdapterLocale[language],
                // @ts-ignore
                localize: {
                    ...languageToAdapterLocale[language].localize,
                    ...(language === 'fa' && fullMonth &&  {
                        month: (month: number) => persianFullMonths[month],
                    }),
                },
            }}

        >
            {props.children}
        </LocalizationProvider>
    );
};
