/*
GET https://perenual.com/api/species-list?key=[YOUR-API-KEY]

key_ sk-DZ9X656f473feb4ba3337

----- Julia hittills -----
-Areca Palm (Dypsis lutescens)
-Bird of Paradise (Strelitzia Nicolai)
-Calathea Medallion (Calathea veitchiana)
-Chinese Money Plant (Pilea peperomiodes)
-Ficus Robusta (Ficus elastica robusta)
-Ficus Tineke (Ficus elastica Tineke)
-Fiddle Leaf Fig (Ficus lyrata)
-Monstera (Monstera deliciosa)
-Peace Lily (Spathiphyllum spp.)
-Peperomia Hope (Peperomia Hope)
Philodendron Micans (Philodendron hederaceum Micans)
-Raven ZZ Plant (Zamioculcas zamiifolia - Raven)
-ZZ Plant (Zamioculcas zamiifolia)

V Parlor Palm (Chamaedorea elegans)
V Areca Palm (Dypsis lutescens)
V Calathea Medallion (Calathea veitchiana)
V Snake Plant (Sansevieria)
V Spider Plant (Chlorophytum comosum)
V Pothos (Epipremnum aureum)
V ZZ Plant (Zamioculcas zamiifolia)
V Raven ZZ PlantPeace Lily (Spathiphyllum)
V Peace Lily (Spathiphyllum spp.)
???? Rubber Plant (Ficus elastica)
V Monstera (Monstera deliciosa)
V Aloe Vera (Aloe barbadensis miller)
V Boston Fern (Nephrolepis exaltata)
V Chinese Evergreen Crete Flame (Aglaonema)
V Money Tree (Pachira aquatica)
V Fiddle Leaf Fig (Ficus lyrata)
Jade Plant (Crassula ovata)
V Areca Palm (Dypsis lutescens)
Philodendron (Philodendron hederaceum) 
V Birkin Philodendron
V Mayoi Philodendron
V Bird of Paradise (Strelitzia reginae)
Anthurium (Anthurium andraeanum)
Swiss Cheese Plant (Monstera adansonii)
Cast Iron Plant (Aspidistra elatior)
Calathea (Calathea spp.)
Ponytail Palm (Beaucarnea recurvata)
Croton (Codiaeum variegatum)
Peperomia (Peperomia spp.)
V Peperomia Hope
String of Pearls (Senecio rowleyanus)
Dragon Tree (Dracaena marginata)
Air Plant (Tillandsia)
-  Golden Pothos (Epipremnum aureum 'Marble Queen')
V Zebrina Plant (Alocasia)
Natal Plum (Carissa macrocarpa)
Rex Begonia (Begonia rex)
Christmas Cactus (Schlumbergera)
V Chinese Money Plant (Pilea peperomioides)
V Red Prayer Plant (Maranta leuconeura)
Haworthia (Haworthiopsis attenuata)
Dieffenbachia (Dieffenbachia spp.)
Norfolk Island Pine (Araucaria heterophylla)
Kalanchoe (Kalanchoe blossfeldiana)
Lavender (Lavandula)
V Weeping Fig (Ficus benjamina)
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
V Ficus Robusta (Ficus elastica robusta)
V Ficus Tineke (Ficus elastica Tineke)


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
