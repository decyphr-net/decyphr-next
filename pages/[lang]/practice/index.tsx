import React from 'react'
import withLocale from '../../../i18n/hoc/withLocale'
import useTranslation from '../../../i18n/hooks/useTranslation'
import DashboardLayout from '../../../components/layout/dashboard'
import { Button } from '../../../components/elements/Button'
import api from '../../../utils/api'

const PracticeSession: React.FC = () => {
  const { locale, t } = useTranslation()
  const [session, setSession] = React.useState({})
  const [errors, setErrors] = React.useState({})

  const startSession = async () => {
    await api('POST', 'practiceSessions', setSession, setErrors, true, {})
  }

  React.useEffect(() => {
  })

  return (
    <DashboardLayout
      title={t('Practicesession.page.title')}
      pageTitle={t('Practicesession.page.header')}
      pageSubtitle={t('Practicesession.page.subheading')}
    >
      <Button
        text={t('Practicesession.session.startbutton')}
        onClickHandler={startSession}
      />
    </DashboardLayout>
  )
}

export default withLocale(PracticeSession)