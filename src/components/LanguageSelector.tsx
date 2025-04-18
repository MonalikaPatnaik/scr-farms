import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' }
  ];

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={i18n.language === lang.code ? "default" : "outline"}
          size="sm"
          onClick={() => i18n.changeLanguage(lang.code)}
        >
          {lang.name}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSelector;
