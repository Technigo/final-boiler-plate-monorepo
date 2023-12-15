/*
GET https://perenual.com/api/species-list?key=[YOUR-API-KEY]

key_ sk-DZ9X656f473feb4ba3337


Snake Plant (Sansevieria)
Spider Plant (Chlorophytum comosum)
Pothos (Epipremnum aureum)
ZZ Plant (Zamioculcas zamiifolia)
Peace Lily (Spathiphyllum)
Rubber Plant (Ficus elastica)
Monstera (Monstera deliciosa)
Aloe Vera (Aloe barbadensis miller)
Boston Fern (Nephrolepis exaltata)
Chinese Evergreen (Aglaonema)
Money Tree (Pachira aquatica)
Fiddle Leaf Fig (Ficus lyrata)
Jade Plant (Crassula ovata)
Areca Palm (Dypsis lutescens)
Philodendron (Philodendron hederaceum)
Bird of Paradise (Strelitzia reginae)
Anthurium (Anthurium andraeanum)
Swiss Cheese Plant (Monstera adansonii)
Cast Iron Plant (Aspidistra elatior)
Calathea (Calathea spp.)
Ponytail Palm (Beaucarnea recurvata)
Croton (Codiaeum variegatum)
Peperomia (Peperomia spp.)
String of Pearls (Senecio rowleyanus)
Dragon Tree (Dracaena marginata)
Air Plant (Tillandsia)
Golden Pothos (Epipremnum aureum 'Marble Queen')
Zebra Plant (Aphelandra squarrosa)
Natal Plum (Carissa macrocarpa)
Rex Begonia (Begonia rex)
Christmas Cactus (Schlumbergera)
Chinese Money Plant (Pilea peperomioides)
Parlor Palm (Chamaedorea elegans)
Red Prayer Plant (Maranta leuconeura)
Haworthia (Haworthiopsis attenuata)
Dieffenbachia (Dieffenbachia spp.)
Norfolk Island Pine (Araucaria heterophylla)
Kalanchoe (Kalanchoe blossfeldiana)
Lavender (Lavandula)
Weeping Fig (Ficus benjamina)
Schefflera (Schefflera arboricola)
Devil's Ivy (Epipremnum aureum 'Neon')
Alocasia (Alocasia spp.)
Venus Flytrap (Dionaea muscipula)
Orchid (Orchidaceae)
Yucca (Yucca elephantipes)
Sago Palm (Cycas revoluta)
Dracaena Janet Craig (Dracaena fragrans 'Janet Craig')
Ponytail Palm (Beaucarnea recurvata)
Maranta (Maranta leuconeura 'Fascinator')


*/

import { PlantModel } from "../models/PlantModel";

import asyncHandler from "express-async-handler"

// desc: Get all plants
// route: /get  
// access: Public
export const getPlantsController = asyncHandler(async (req, res) => {
    await PlantModel.find()
    .then((plants) => {
        if (plants.length > 0) {
            res.json(plants)
        } else {
            res.status(404).json({ error: "No plants found"})
        }
    })
    .catch((error) => {
        res.status(500).json({ error: "Something went wrong"})
    })
})

// desc: Get single plant
// route: /get
// access: Public
export const getPlantController = asyncHandler(async (req, res) => {
    const plantId = req.params.plantId
    await PlantModel.findOne({ _id: plantId})
    .then((plant) => {
        if (plant) {
            res.json(plant)
        } else {
            res.status(500).json({ error: "Plant not found"})
        }
    })
    .catch((error) => {
        res.status(500).json({ error: "Something went wrong"})
    })
})
