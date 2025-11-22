import { defineQuery } from "next-sanity";

export const HERO_QUERY = defineQuery(`*[_id == "hero"][0]{
  backgroundImage,
  darkenImage,
  blurText,
  announcement,
  title,
  subtitle
  }`);

export const SERVICIOS_QUERY = defineQuery(`*[_id == "servicios"][0]{
  title,
  description,
  services,
  }`);

export const PERFORMANCE_QUERY = defineQuery(`*[_type == "performance"][0]{
  title,
  description,
  images[]{
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height,
          aspectRatio
        }
      }
    }
  }
}`);

export const TESTIMONIOS_QUERY = defineQuery(`*[_type == "testimonios"][0]{
  _id,
  title,
  description,
  textTestimonials[]{
    reference,
    name
  },
  videoTestimonials[]{
    video{
      asset->{
        _id,
        url
      }
    }
  }
}`);

export const PREGUNTAS_QUERY =
  defineQuery(`*[_type == "preguntasFrecuentes"][0]{
  _id,
  title,
  questions[]{
    question,
    answer
  }
}`);

export const NOSOTROS_QUERY = defineQuery(`*[_id == "sobreNosotros"][0]{
  title,
  subtitle,
  description,
  buttonDescription,
  image,
  }`);

export const CONTACTO_QUERY = defineQuery(`*[_type == "contacto"][0]{
  _id,
  title,
  description,
  googleMapsCordenates
}`);
