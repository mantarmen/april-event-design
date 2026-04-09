export type SiteContent = {
  heroTitle: string
  heroSubtitle: string
  heroButtonText: string
  heroButtonLink: string

  servicesTitle: string
  servicesText: string

  aboutTitle: string
  aboutText: string

  contactTitle: string
  contactText: string

  phone: string
  email: string
  instagram: string

  backgroundColor: string
  backgroundImage: string
  fontFamily: string
}

export type GalleryItem = {
  id: string
  image: string
  title: string
}

export const defaultSiteContent: SiteContent = {
  heroTitle: "Elevated Event Design for Refined Celebrations",
  heroSubtitle:
    "April Event Design creates polished, memorable experiences through premium rentals, elegant styling, and intentional detail.",
  heroButtonText: "Start Your Event",
  heroButtonLink: "#contact",

  servicesTitle: "Design, Rentals & Styling",
  servicesText:
    "From intimate celebrations to statement events, we offer event design, curated rental selections, styling support, and elevated setup for weddings, private parties, baby showers, and select corporate gatherings.",

  aboutTitle: "Thoughtful Design, Beautifully Executed",
  aboutText:
    "April Event Design was created for clients who want their event to feel polished, intentional, and visually unforgettable. We combine premium styling with a warm, tailored approach so every detail feels cohesive, elegant, and effortless.",

  contactTitle: "Let’s Design Something Beautiful",
  contactText:
    "Tell us about your date, event type, and overall vision. We’ll help you create a refined setup that feels personal, stylish, and seamless.",

  phone: "(000) 000-0000",
  email: "hello@aprileventdesign.com",
  instagram: "https://instagram.com/aprileventdesign",

  backgroundColor: "#000000",
  backgroundImage: "",
  fontFamily: "playfair-inter",
}

export const defaultGallery: GalleryItem[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    title: "Elegant Tablescape Styling",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    title: "Romantic Wedding Details",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
    title: "Modern Celebration Setup",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    title: "Curated Event Atmosphere",
  },
]

export const SITE_CONTENT_KEY = "aprileventdesign-site-content"
export const GALLERY_KEY = "aprileventdesign-gallery"