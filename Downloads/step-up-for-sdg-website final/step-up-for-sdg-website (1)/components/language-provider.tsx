"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

const translations: Record<string, Record<string, string>> = {
  en: {
    Home: "Home",
    "About Us": "About Us",
    SDG: "SDG",
    Partners: "Partners",
    Contact: "Contact",
    "Get Involved": "Get Involved",
    "Students, Companies and NGOs for SDG Impact": "Students, Companies and NGOs for SDG Impact",
    "Connecting schools, NGOs, companies and communities to improve education through SDG 4.": "Connecting schools, NGOs, companies and communities to improve education through SDG 4.",
    "Partner With Us": "Partner With Us",
    "Join the School": "Join the School",
    "NGO Collaboration": "NGO Collaboration",
    "Become a Partner": "Become a Partner",
    "Register School": "Register School",
    "Collaborate": "Collaborate",
    "Schools Supported": "Schools Supported",
    "Projects Completed": "Projects Completed",
    "Total Students Enrolled": "Total Students Enrolled",
    "NGO Partners": "NGO Partners",
      "Companies": "Companies",
      "Schools": "Schools",
      "NGOs": "NGOs",
      "Explore Partnership": "Explore Partnership",
      "Join as School": "Join as School",
      "Collaborate Now": "Collaborate Now",
    "Live Impact Map": "Live Impact Map",
    "Country impact": "Country impact",
    "Legend": "Legend",
      "Quick Links": "Quick Links",
      "Follow Us": "Follow Us",
      "Languages": "Languages",
      "English": "English",
      "Telugu": "Telugu",
      "Hindi": "Hindi",
    "Volunteer Hours": "Volunteer Hours",
    "Success Stories": "Success Stories",
    "Live Impact Count": "Live Impact Count",
    "UNITE 2030 Vision": "UNITE 2030 Vision",
    "Search placeholder": "Search country or region...",
    "No impact data found": "No impact data found for this country.",
    "Partner, Register or Collaborate": "Partner, Register or Collaborate",
  },
  hi: {
    Home: "होम",
    "About Us": "हमारे बारे में",
    SDG: "एसडीजी",
    Partners: "साझेदार",
    Contact: "संपर्क",
    "Get Involved": "शामिल हों",
    "Students, Companies and NGOs for SDG Impact": "एसडीजी प्रभाव के लिए छात्र, कंपनियां और एनजीओ",
    "Connecting schools, NGOs, companies and communities to improve education through SDG 4.": "स्कूलों, NGOs, कंपनियों और समुदायों को SDG 4 के माध्यम से शिक्षा बेहतर बनाने के लिए जोड़ना।",
    "Partner With Us": "हमारे साथ साझेदारी करें",
    "Join the School": "स्कूल में शामिल हों",
    "NGO Collaboration": "एनजीओ सहयोग",
    "Become a Partner": "एक भागीदार बनें",
    "Register School": "स्कूल पंजीकृत करें",
    "Collaborate": "सहयोग करें",
    "Schools Supported": "समर्थित स्कूल",
    "Projects Completed": "पूरा किया गया प्रोजेक्ट",
    "Total Students Enrolled": "कुल नामांकित छात्र",
    "NGO Partners": "एनजीओ साझेदार",
    "Companies": "कंपनियां",
    "Schools": "स्कूल",
    "NGOs": "एनजीओ",
    "Explore Partnership": "भाग लेंशिप का पता लगाएं",
    "Join as School": "स्कूल के रूप में शामिल हों",
    "Collaborate Now": "अभी सहयोग करें",
    "Live Impact Map": "लाइव प्रभाव मानचित्र",
    "Country impact": "देश का प्रभाव",
    "Legend": "किंवदंती",
    "Quick Links": "त्वरित लिंक",
    "Follow Us": "हमें फॉलो करें",
    "Languages": "भाषाएँ",
    "English": "अंग्रेजी",
    "Telugu": "तेलुगु",
    "Hindi": "हिंदी",
    "Volunteer Hours": "स्वयंसेवक घंटे",
    "Success Stories": "सफलता की कहानियाँ",
    "Live Impact Count": "लाइव प्रभाव गणना",
    "UNITE 2030 Vision": "UNITE 2030 दृष्टि",
    "Search placeholder": "देश या क्षेत्र खोजें...",
    "No impact data found": "इस देश के लिए प्रभाव डेटा नहीं मिला।",
    "Partner, Register or Collaborate": "भाग लें, पंजीकृत करें या सहयोग करें",
  },
  te: {
    Home: "హోమ్",
    "About Us": "మా గురించి",
    SDG: "SDG",
    Partners: "భాగస్వాముల",
    Contact: "సంपర్క",
    "Get Involved": "కలిసి ఉండండి",
    "Students, Companies and NGOs for SDG Impact": "SDG ప్రభావం కోసం విద్యార్థులు, కంపెనీలు మరియు NGOలు",
    "Connecting schools, NGOs, companies and communities to improve education through SDG 4.": "SDG 4 ద్వారా విద్యను మెరుగుపరచడానికి పాఠశాలలు, NGOలు, కంపెనీలు మరియు సమాజాలను కనెక్ట్ చేయడం.",
    "Partner With Us": "మమ్ములో భాగస్వామిగా ఉండండి",
    "Join the School": "పాఠశాలలో చేరండి",
    "NGO Collaboration": "NGO సహযోగం",
    "Become a Partner": "భాగస్వామిగా మారండి",
    "Register School": "పాఠశాలను నమోదు చేయండి",
    "Collaborate": "సహకారం చేయండి",
    "Schools Supported": "సమర్థించిన పాఠశాలలు",
    "Projects Completed": "సంపూర్ణం చేసిన ప్రాజెక్టులు",
    "Total Students Enrolled": "మొత్తం నమోదు చేసిన విద్యార్థులు",
    "NGO Partners": "NGO భాగస్వాములు",
    "Companies": "కంపెనీలు",
    "Schools": "పాఠశాలలు",
    "NGOs": "NGOలు",
    "Explore Partnership": "భాగస్వామ్యాన్ని అన్వేషించండి",
    "Join as School": "పాఠశాలగా చేరండి",
    "Collaborate Now": "ఇప్పుడే సహకారం చేయండి",
    "Live Impact Map": "లైవ్ ప్రభాव మ్యాప్",
    "Country impact": "దేశ ప్రభావం",
    "Legend": "లెజెండ్",
    "Quick Links": "త్వరిత లింకులు",
    "Follow Us": "మమ్మల్ని అనుసరించండి",
    "Languages": "భాషలు",
    "English": "ఆంగ్లం",
    "Telugu": "తెలుగు",
    "Hindi": "హిందీ",
    "Volunteer Hours": "స్వచ్ఛంద సేవ గంటలు",
    "Success Stories": "విజయ కథలు",
    "Live Impact Count": "లైవ్ ప్రభాव గణన",
    "UNITE 2030 Vision": "UNITE 2030 దృష్టిభంగం",
    "Search placeholder": "దేశం లేదా ప్రాంతాన్ని శోధించండి...",
    "No impact data found": "ఈ దేశానికి ప్రభాव డేటా కనుగొనబడలేదు.",
    "Partner, Register or Collaborate": "భాగస్వామ్యం, నమోదు లేదా సహకారం",
  },
  ca: {
    Home: "ಮುಖಪುಟ",
    "About Us": "ನಮ್ಮ ಬಗ್ಗೆ",
    SDG: "SDG",
    Partners: "ಪಾರ್ಟನರ್‍ಗಳು",
    Contact: "ಸಂಪರ್ಕ",
    "Get Involved": " ಸೇರಿ ",
    "Students, Companies and NGOs for SDG Impact": "SDG ಪರಿಣಾಮಕ್ಕಾಗಿ ವಿದ್ಯಾರ್ಥಿಗಳು, ಕಂಪನಿಗಳು ಮತ್ತು NGOಗಳು",
    "Connecting schools, NGOs, companies and communities to improve education through SDG 4.": "ಶಾಲೆಗಳು, NGOಗಳು, ಕಂಪನಿಗಳು ಮತ್ತು ಸಮುದಾಯಗಳನ್ನು SDG 4 ಮುಖಾಂತರ ಶಿಕ್ಷಣವನ್ನು ಸುಧಾರಿಸುವುದಕ್ಕಾಗಿ ಸಂಪರ್ಕಿಸುವುದು.",
    "Partner With Us": "ನಮ್ಮೊಂದಿಗೆ ಪಾಲುದಾರರಾಗಿ",
    "Join the School": "ಶಾಲೆಯೊಂದಿಗೆ ಸೇರಿ",
    "NGO Collaboration": "NGO ಸಹಕಾರ",
    "Become a Partner": "ಒಂದು ಪಾಲುದಾರರಾಗಿ ಆಗಿ",
    "Register School": "ಶಾಲೆಯನ್ನು ನೋಂದಾಯಿಸಿ",
    "Collaborate": "ಸಹಕರಿಸಿ",
    "Schools Supported": "ಬೆಂಬಲಿತ ಶಾಲೆಗಳು",
    "Projects Completed": "ಪೂರ್ಣಗೊಂಡ ಯೋಜನೆಗಳು",
    "Total Students Enrolled": "ಒಟ್ಟು ದಾಖಲಾದ ವಿದ್ಯಾರ್ಥಿಗಳು",
    "NGO Partners": "NGO ಪಾಲುದಾರರು",
    "Companies": "ಕಂಪನಿಗಳು",
    "Schools": "ಶಾಲೆಗಳು",
    "NGOs": "NGOs",
    "Explore Partnership": "ಭಾಗುದಾರಿಕೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
    "Join as School": "ಶಾಲೆಯಾಗಿ ಸೇರಿ",
    "Collaborate Now": "ಈಗ ಸಹಕರಿಸಿ",
    "Live Impact Map": "ಲೈವ್ ಇಂಪ್ಯಾಕ್ಟ್ ಮ್ಯಾಪ್",
    "Country impact": "ದೇಶದ ಪ್ರಭಾವ",
    "Legend": "ರೆಜೆಂಡ್",
    "Quick Links": "ಕ್ವಿಕ್ ಲಿಂಕ್ಸ್",
    "Follow Us": "ನಮ್ಮನ್ನು ಅನುಸರಿಸಿ",
    "Languages": "ಭಾಷೆಗಳು",
    "English": "ಇಂಗ್ಲಿಷ್",
    "Telugu": "ತೇಲುಗु",
    "Hindi": "ಹಿಂದಿ",
    "Volunteer Hours": "ಸೇವಕಗಳ ಗಂಟೆಗಳು",
    "Success Stories": "ಯಶಸ್ಸಿನ ಕಥೆಗಳು",
    "Live Impact Count": "ಲೈವ್ ಇಂಪ್ಯಾಕ್ಟ್ ಕೌಂಟ್",
    "UNITE 2030 Vision": "UNITE 2030 ದೃಷ್ಟಿ",
    "Search placeholder": "ದೇಶ ಅಥವಾ ಪ್ರಾಂತ್ಯವನ್ನು ಹುಡುಕಿ...",
    "No impact data found": "ಈ ದೇಶಕ್ಕೆ ಪ್ರಭಾವದ ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ.",
    "Partner, Register or Collaborate": "ಭಾಗಿಯಾಗಿರಿ, ನೋಂದಾಯಿಸಿ ಅಥವಾ ಸಹಕರಿಸಿ",
  },
}

type Lang = "en" | "hi" | "te"

const LangContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  t: (k: string) => string
}>({ lang: "en", setLang: () => {}, t: (k) => k })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en"
    return (localStorage.getItem("lang") as Lang) || "en"
  })

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang)
    } catch (e) {}
  }, [lang])

  const t = (k: string) => {
    return translations[lang][k] || translations["en"][k] || k
  }

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export function useLanguage() {
  return useContext(LangContext)
}

export default LanguageProvider
