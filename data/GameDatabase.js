const GameDatabase = {
    regions: {
        noroeste: {
            title: "Noroeste",
            description:
                "Una región de montañas, quebradas y tradiciones ancestrales del norte argentino.",
            mapImage: "noroeste_map",
            levels: {
                flora: {
                    title: "Flora",
                    description:
                        "Explorá la vegetación característica del Noroeste argentino, desde cactus gigantes hasta las yungas subtropicales.",
                    coverImage: "noroeste_flora"
                },
                fauna: {
                    title: "Fauna",
                    description:
                        "Descubrí animales emblemáticos como llamas, vicuñas y cóndores andinos.",
                    coverImage: "noroeste_fauna"
                },
                folclore: {
                    title: "Folclore",
                    description:
                        "Conocé las danzas, leyendas y tradiciones populares del Noroeste argentino.",
                    coverImage: "noroeste_folclore"
                }
            }
        },

        cuyo: {
            title: "Cuyo",
            description:
                "Una región de montañas, desiertos y viñedos al pie de la Cordillera de los Andes.",
            mapImage: "cuyo_map",
            levels: {
                flora: {
                    title: "Flora",
                    description:
                        "Aprendé sobre la flora árida y montañosa de Cuyo, incluyendo jarillas y viñedos.",
                    coverImage: "cuyo_flora"
                },
                fauna: {
                    title: "Fauna",
                    description:
                        "Explorá especies típicas como guanacos, zorros grises y cóndores.",
                    coverImage: "cuyo_fauna"
                },
                folclore: {
                    title: "Folclore",
                    description:
                        "Descubrí las tradiciones culturales y musicales típicas de la región cuyana.",
                    coverImage: "cuyo_folclore"
                }
            }
        },

        pampa: {
            title: "Pampa",
            description:
                "La región de las grandes llanuras argentinas y la tradición gauchesca.",
            mapImage: "pampa_map",
            levels: {
                flora: {
                    title: "Flora",
                    description:
                        "Recorré los pastizales y la vegetación típica de la llanura pampeana.",
                    coverImage: "pampa_flora"
                },
                fauna: {
                    title: "Fauna",
                    description:
                        "Conocé especies típicas como ñandúes, mulitas y zorros pampeanos.",
                    coverImage: "pampa_fauna"
                },
                folclore: {
                    title: "Folclore",
                    description:
                        "Aprendé sobre las tradiciones gauchas, las payadas y las danzas folklóricas.",
                    coverImage: "pampa_folclore"
                }
            }
        },

        litoral: {
            title: "Litoral",
            description:
                "Una región de ríos, selvas y biodiversidad exuberante.",
            mapImage: "litoral_map",
            levels: {
                flora: {
                    title: "Flora",
                    description:
                        "Explorá la vegetación selvática y ribereña del Litoral argentino.",
                    coverImage: "litoral_flora"
                },
                fauna: {
                    title: "Fauna",
                    description:
                        "Descubrí yacarés, tucanes, carpinchos y otras especies del Litoral.",
                    coverImage: "litoral_fauna"
                },
                folclore: {
                    title: "Folclore",
                    description:
                        "Conocé los ritmos y tradiciones populares del Litoral argentino.",
                    coverImage: "litoral_folclore"
                }
            }
        },

        patagonia: {
            title: "Patagonia",
            description:
                "Una región de glaciares, montañas, bosques y extensas estepas.",
            mapImage: "patagonia_map",
            levels: {
                flora: {
                    title: "Flora",
                    description:
                        "Explorá los bosques andinos y las estepas patagónicas.",
                    coverImage: "patagonia_flora"
                },
                fauna: {
                    title: "Fauna",
                    description:
                        "Descubrí pingüinos, ballenas, guanacos y otras especies típicas.",
                    coverImage: "patagonia_fauna"
                },
                folclore: {
                    title: "Folclore",
                    description:
                        "Aprendé sobre las leyendas y culturas tradicionales patagónicas.",
                    coverImage: "patagonia_folclore"
                }
            }
        },

        malvinas: {
            title: "Islas Malvinas",
            description:
                "Un archipiélago del Atlántico Sur con una rica biodiversidad marina.",
            mapImage: "malvinas_map",
            levels: {
                flora: {
                    title: "Flora",
                    description:
                        "Conocé la vegetación típica de las Islas Malvinas y sus paisajes fríos.",
                    coverImage: "malvinas_flora"
                },
                fauna: {
                    title: "Fauna",
                    description:
                        "Explorá la fauna marina y terrestre de las Islas Malvinas.",
                    coverImage: "malvinas_fauna"
                },
                folclore: {
                    title: "Folclore",
                    description:
                        "Descubrí historias y aspectos culturales relacionados con Malvinas.",
                    coverImage: "malvinas_folclore"
                }
            }
        }
    }
};

export default GameDatabase;