export default {
    "source": "octopus",
    "topic": "traversalReport",
    "version": 1,
    "data": {
        "sortedNodeNames": [
            "ready",
            "petitsBois",
            "sensOuverture",
            "appuiEtSeuil",
            "dormant",
            "typeCote",
            "typePose",
            "forme",
            "gamme",
            "produit",
            "soubassement",
            "dispositionPetitsBois",
            "dimensions",
            "meneau",
            "traverse",
            "prixChassisPrincipal",
            "couleur",
            "gammeCouleurForme",
            "dimensionsHorsTout",
            "vitrages",
            "vitragesFiltered",
            "vitragesMainSelection",
            "soubassementVitrage",
            "soubassementTraverseMeneau",
            "vitragePetitBois",
            "validateVitrage",
            "conditionsAchatVente",
            "oscilloBattant",
            "listeOptionsChoisis",
            "prixProduit",
            "prixRemise",
            "tvaTotalTtc",
            "margeVendeur",
            "sensOuvertureOb"
        ],
        "edges": [
            {
                "from": "produit",
                "to": "dimensions"
            },
            {
                "from": "dimensions",
                "to": "dimensionsHorsTout"
            },
            {
                "from": "dimensions",
                "to": "prixChassisPrincipal"
            },
            {
                "from": "gamme",
                "to": "vitragesFiltered"
            },
            {
                "from": "dimensions",
                "to": "vitragesFiltered"
            },
            {
                "from": "vitrages",
                "to": "vitragesFiltered"
            },
            {
                "from": "conditionsAchatVente",
                "to": "oscilloBattant"
            },
            {
                "from": "petitsBois",
                "to": "dispositionPetitsBois"
            },
            {
                "from": "produit",
                "to": "dispositionPetitsBois"
            },
            {
                "from": "sensOuverture",
                "to": "sensOuvertureOb"
            },
            {
                "from": "oscilloBattant",
                "to": "sensOuvertureOb"
            },
            {
                "from": "produit",
                "to": "soubassement"
            },
            {
                "from": "dimensions",
                "to": "vitragesMainSelection"
            },
            {
                "from": "vitragesFiltered",
                "to": "vitragesMainSelection"
            },
            {
                "from": "soubassement",
                "to": "vitragesMainSelection"
            },
            {
                "from": "vitragesMainSelection",
                "to": "validateVitrage"
            },
            {
                "from": "dimensions",
                "to": "validateVitrage"
            },
            {
                "from": "vitragesMainSelection",
                "to": "vitragePetitBois"
            },
            {
                "from": "petitsBois",
                "to": "vitragePetitBois"
            },
            {
                "from": "dispositionPetitsBois",
                "to": "vitragePetitBois"
            },
            {
                "from": "soubassement",
                "to": "soubassementVitrage"
            },
            {
                "from": "dimensions",
                "to": "soubassementVitrage"
            },
            {
                "from": "vitragesFiltered",
                "to": "soubassementVitrage"
            },
            {
                "from": "vitragesMainSelection",
                "to": "soubassementVitrage"
            },
            {
                "from": "dimensions",
                "to": "traverse"
            },
            {
                "from": "produit",
                "to": "traverse"
            },
            {
                "from": "dimensions",
                "to": "meneau"
            },
            {
                "from": "produit",
                "to": "meneau"
            },
            {
                "from": "soubassement",
                "to": "soubassementTraverseMeneau"
            },
            {
                "from": "traverse",
                "to": "soubassementTraverseMeneau"
            },
            {
                "from": "meneau",
                "to": "soubassementTraverseMeneau"
            },
            {
                "from": "soubassementVitrage",
                "to": "soubassementTraverseMeneau"
            },
            {
                "from": "gamme",
                "to": "couleur"
            },
            {
                "from": "soubassement",
                "to": "couleur"
            },
            {
                "from": "traverse",
                "to": "couleur"
            },
            {
                "from": "meneau",
                "to": "couleur"
            },
            {
                "from": "dispositionPetitsBois",
                "to": "couleur"
            },
            {
                "from": "prixChassisPrincipal",
                "to": "couleur"
            },
            {
                "from": "gamme",
                "to": "gammeCouleurForme"
            },
            {
                "from": "couleur",
                "to": "gammeCouleurForme"
            },
            {
                "from": "forme",
                "to": "gammeCouleurForme"
            },
            {
                "from": "conditionsAchatVente",
                "to": "prixProduit"
            },
            {
                "from": "dimensions",
                "to": "prixProduit"
            },
            {
                "from": "listeOptionsChoisis",
                "to": "prixProduit"
            },
            {
                "from": "prixChassisPrincipal",
                "to": "prixProduit"
            },
            {
                "from": "prixProduit",
                "to": "prixRemise"
            },
            {
                "from": "prixRemise",
                "to": "margeVendeur"
            },
            {
                "from": "prixProduit",
                "to": "margeVendeur"
            },
            {
                "from": "dimensions",
                "to": "margeVendeur"
            },
            {
                "from": "prixRemise",
                "to": "tvaTotalTtc"
            },
            {
                "from": "dimensions",
                "to": "tvaTotalTtc"
            },
            {
                "from": "vitrages",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "produit",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "gamme",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "vitragesFiltered",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "forme",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "typePose",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "typeCote",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "dormant",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "appuiEtSeuil",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "sensOuverture",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "oscilloBattant",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "petitsBois",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "dispositionPetitsBois",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "soubassement",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "vitragesMainSelection",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "soubassementVitrage",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "traverse",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "meneau",
                "to": "listeOptionsChoisis"
            },
            {
                "from": "couleur",
                "to": "listeOptionsChoisis"
            }
        ],
        "state": {
            "conditionsAchatVente": {
                "remise": 0.4,
                "coefficientVente": 2,
                "coefficientVenteEnSaisie": "2"
            },
            "vitrages": {
                "optionName": "vitrage",
                "optionValues": [
                    {
                        "optionValueGroupName": "doubleVitrage",
                        "valueName": "doubleVitrageVIR416WarmEdgeArgon4",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_16_4-01.jpg",
                        "gamme": "gammePop",
                        "prixM2": 0
                    },
                    {
                        "optionValueGroupName": "doubleVitrage",
                        "valueName": "doubleVitrageVIR414WarmEdgeArgon6",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_14_6-01.jpg",
                        "gamme": "gammePop",
                        "prixM2": 41
                    },
                    {
                        "optionValueGroupName": "doubleVitrage",
                        "valueName": "doubleVitrageVIR620WarmEdgeArgon6",
                        "imageUrl": "/static/images/ico_img_Vitrages-6_20_6-01.jpg",
                        "gamme": "gammePop",
                        "prixM2": 49
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAutoNettoyant",
                        "valueName": "doubleVitrageVIR416WarmEdgeArgon4Autonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_16_4-03.jpg",
                        "gamme": "gammePop",
                        "prixM2": 136
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAutoNettoyant",
                        "valueName": "doubleVitrageVIR414WarmEdgeArgon6Autonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_14_6-03.jpg",
                        "gamme": "gammePop",
                        "prixM2": 213
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAutoNettoyant",
                        "valueName": "doubleVitrageVIR44214WarmEdgeArgon442Autonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-44%2C2_14_44%2C2-03.jpg",
                        "gamme": "gammePop",
                        "prixM2": 198
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAcoustique",
                        "valueName": "doubleVitrageAcoustiqueVIR420WarmEdgeArgon8",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_20_8-02.jpg",
                        "gamme": "gammePop",
                        "prixM2": 47
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAcoustique",
                        "valueName": "doubleVitrageAcoustiqueVIR1014WarmEdgeArgon441silence",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-02.jpg",
                        "gamme": "gammePop",
                        "prixM2": 194
                    },
                    {
                        "optionValueGroupName": "doubleVitrageSecurité",
                        "valueName": "doubleVitrageScuritVIR418WarmEdgeArgon442",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-03.jpg",
                        "gamme": "gammePop",
                        "prixM2": 80
                    },
                    {
                        "optionValueGroupName": "doubleVitrageSecurité",
                        "valueName": "doubleVitrageScuritVIR44218WarmEdgeArgon4",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-04.jpg",
                        "gamme": "gammePop",
                        "prixM2": 152
                    },
                    {
                        "optionValueGroupName": "doubleVitrageSecurité",
                        "valueName": "doubleVitrageScuritVIR44214WarmEdgeArgon442",
                        "imageUrl": "/static/images/ico_img_Vitrages-44%2C2_14_44%2C2-09.jpg",
                        "gamme": "gammePop",
                        "prixM2": 137
                    },
                    {
                        "optionValueGroupName": "remplissagePlein",
                        "valueName": "panneauMousseDe24mmPop",
                        "imageUrl": "/static/images/ico_Panneau%20mousse.jpg",
                        "gamme": "gammePop",
                        "prixM2": 126
                    },
                    {
                        "optionValueGroupName": "remplissagePlein",
                        "valueName": "panneauRainuréDe31mm",
                        "imageUrl": "/static/images/ico_Panneau%20rainure.jpg",
                        "gamme": "gammePop",
                        "prixM2": 126
                    },
                    {
                        "optionValueGroupName": "tripleVitrage",
                        "valueName": "TriplevitrageVIR418WarmEdgeargon418WarmEdgeargon4VIR",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-05.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 117
                    },
                    {
                        "optionValueGroupName": "tripleVitrageAutoNettoyant",
                        "valueName": "TriplevitrageVIR418WarmEdgeargon418WarmEdgeargon4VIRautonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-06.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 119
                    },
                    {
                        "optionValueGroupName": "tripleVitrageAutoNettoyant",
                        "valueName": "TriplevitrageVIR44215WarmEdgeargon415WarmEdgeargon4VIRautonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-07.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 313
                    },
                    {
                        "optionValueGroupName": "tripleVitrageAutoNettoyant",
                        "valueName": "TriplevitrageVIR44212WarmEdgeargon412WarmEdgeargon442VIRautonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-08.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 466
                    },
                    {
                        "optionValueGroupName": "tripleVitrageSecurite",
                        "valueName": "TriplevitrageVIR415WarmEdgeargon415WarmEdgeargon442VIR",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-09.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 213
                    },
                    {
                        "optionValueGroupName": "tripleVitrageSecurite",
                        "valueName": "TriplevitrageVIR414WarmEdgeargon414WarmEdgeargonSP10VIR",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-10.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 328
                    },
                    {
                        "optionValueGroupName": "tripleVitrageSecurite",
                        "valueName": "TriplevitrageVIR44212WarmEdgeargon412WarmEdgeargon442VIR",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-07.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 402
                    },
                    {
                        "optionValueGroupName": "remplissagePlein",
                        "valueName": "panneauMousseDe24mmAdvance",
                        "imageUrl": "/static/images/ico_Panneau%20mousse.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 126
                    },
                    {
                        "optionValueGroupName": "remplissagePlein",
                        "valueName": "panneauRainuréDe31mm",
                        "imageUrl": "/static/images/ico_Panneau%20rainure.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 126
                    }
                ],
                "displayHint": "",
                "optionPrice": 0
            },
            "produit": {
                "optionName": "produit",
                "optionValues": [
                    {
                        "valueName": "aucun",
                        "productCode": "",
                        "imageUrl": ""
                    },
                    {
                        "valueName": "fenetre1Vantail",
                        "productCode": "F1",
                        "imageUrl": "/static/images/F1.png",
                        "minH": 264,
                        "maxH": 1850,
                        "defaultH": 1650,
                        "minL": 316,
                        "maxL": 1400,
                        "defaultL": 800,
                        "nVantaux": 1
                    },
                    {
                        "valueName": "fenetre2Vantaux",
                        "productCode": "F2",
                        "imageUrl": "/static/images/F2.png",
                        "minH": 500,
                        "maxH": 1850,
                        "defaultH": 1650,
                        "minL": 630,
                        "maxL": 1800,
                        "defaultL": 1000,
                        "nVantaux": 2
                    },
                    {
                        "valueName": "porteFenetre1Vantail",
                        "productCode": "PF1",
                        "imageUrl": "/static/images/PF1.png",
                        "minH": 1850,
                        "maxH": 2350,
                        "defaultH": 2150,
                        "minL": 316,
                        "maxL": 1000,
                        "defaultL": 800,
                        "nVantaux": 1
                    },
                    {
                        "valueName": "porteFenetre2Vantaux",
                        "productCode": "PF2",
                        "imageUrl": "/static/images/PF2.png",
                        "minH": 1850,
                        "maxH": 2350,
                        "defaultH": 2150,
                        "minL": 642,
                        "maxL": 1800,
                        "defaultL": 1200,
                        "nVantaux": 2
                    }
                ],
                "selectedIndex": 0,
                "selectedProductCode": "",
                "selectedProductName": "aucun"
            },
            "dimensions": {
                "quantite": 1,
                "valid": false,
                "xMsg": "",
                "yMsg": ""
            },
            "dimensionsHorsTout": {
                "hauteurHorsTout": null,
                "largeurHorsTout": null
            },
            "prixChassisPrincipal": 0,
            "gamme": {
                "displayHint": "standardOptionWithIcons",
                "optionName": "gamme",
                "optionPrice": 0,
                "optionValues": [
                    {
                        "valueName": "gammePop",
                        "imageUrl": "/static/images/gammePop.png",
                        "originalIndex": 0
                    },
                    {
                        "valueName": "gammeAdvance",
                        "imageUrl": "/static/images/gammeAdvance.png",
                        "originalIndex": 1
                    }
                ],
                "defaultIndex": 0,
                "selectedIndex": 0,
                "selectedValueName": "gammePop"
            },
            "vitragesFiltered": {
                "optionName": "vitrage",
                "optionValues": [
                    {
                        "optionValueGroupName": "doubleVitrage",
                        "valueName": "doubleVitrageVIR416WarmEdgeArgon4",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_16_4-01.jpg",
                        "gamme": "gammePop",
                        "prixM2": 0
                    },
                    {
                        "optionValueGroupName": "doubleVitrage",
                        "valueName": "doubleVitrageVIR414WarmEdgeArgon6",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_14_6-01.jpg",
                        "gamme": "gammePop",
                        "prixM2": 41
                    },
                    {
                        "optionValueGroupName": "doubleVitrage",
                        "valueName": "doubleVitrageVIR620WarmEdgeArgon6",
                        "imageUrl": "/static/images/ico_img_Vitrages-6_20_6-01.jpg",
                        "gamme": "gammePop",
                        "prixM2": 49
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAutoNettoyant",
                        "valueName": "doubleVitrageVIR416WarmEdgeArgon4Autonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_16_4-03.jpg",
                        "gamme": "gammePop",
                        "prixM2": 136
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAutoNettoyant",
                        "valueName": "doubleVitrageVIR414WarmEdgeArgon6Autonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_14_6-03.jpg",
                        "gamme": "gammePop",
                        "prixM2": 213
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAutoNettoyant",
                        "valueName": "doubleVitrageVIR44214WarmEdgeArgon442Autonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-44%2C2_14_44%2C2-03.jpg",
                        "gamme": "gammePop",
                        "prixM2": 198
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAcoustique",
                        "valueName": "doubleVitrageAcoustiqueVIR420WarmEdgeArgon8",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_20_8-02.jpg",
                        "gamme": "gammePop",
                        "prixM2": 47
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAcoustique",
                        "valueName": "doubleVitrageAcoustiqueVIR1014WarmEdgeArgon441silence",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-02.jpg",
                        "gamme": "gammePop",
                        "prixM2": 194
                    },
                    {
                        "optionValueGroupName": "doubleVitrageSecurité",
                        "valueName": "doubleVitrageScuritVIR418WarmEdgeArgon442",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-03.jpg",
                        "gamme": "gammePop",
                        "prixM2": 80
                    },
                    {
                        "optionValueGroupName": "doubleVitrageSecurité",
                        "valueName": "doubleVitrageScuritVIR44218WarmEdgeArgon4",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-04.jpg",
                        "gamme": "gammePop",
                        "prixM2": 152
                    },
                    {
                        "optionValueGroupName": "doubleVitrageSecurité",
                        "valueName": "doubleVitrageScuritVIR44214WarmEdgeArgon442",
                        "imageUrl": "/static/images/ico_img_Vitrages-44%2C2_14_44%2C2-09.jpg",
                        "gamme": "gammePop",
                        "prixM2": 137
                    },
                    {
                        "optionValueGroupName": "remplissagePlein",
                        "valueName": "panneauMousseDe24mmPop",
                        "imageUrl": "/static/images/ico_Panneau%20mousse.jpg",
                        "gamme": "gammePop",
                        "prixM2": 126
                    },
                    {
                        "optionValueGroupName": "remplissagePlein",
                        "valueName": "panneauRainuréDe31mm",
                        "imageUrl": "/static/images/ico_Panneau%20rainure.jpg",
                        "gamme": "gammePop",
                        "prixM2": 126
                    },
                    {
                        "optionValueGroupName": "tripleVitrage",
                        "valueName": "TriplevitrageVIR418WarmEdgeargon418WarmEdgeargon4VIR",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-05.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 117,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageAutoNettoyant",
                        "valueName": "TriplevitrageVIR418WarmEdgeargon418WarmEdgeargon4VIRautonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-06.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 119,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageAutoNettoyant",
                        "valueName": "TriplevitrageVIR44215WarmEdgeargon415WarmEdgeargon4VIRautonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-07.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 313,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageAutoNettoyant",
                        "valueName": "TriplevitrageVIR44212WarmEdgeargon412WarmEdgeargon442VIRautonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-08.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 466,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageSecurite",
                        "valueName": "TriplevitrageVIR415WarmEdgeargon415WarmEdgeargon442VIR",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-09.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 213,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageSecurite",
                        "valueName": "TriplevitrageVIR414WarmEdgeargon414WarmEdgeargonSP10VIR",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-10.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 328,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageSecurite",
                        "valueName": "TriplevitrageVIR44212WarmEdgeargon412WarmEdgeargon442VIR",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-07.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 402,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "remplissagePlein",
                        "valueName": "panneauMousseDe24mmAdvance",
                        "imageUrl": "/static/images/ico_Panneau%20mousse.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 126,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "remplissagePlein",
                        "valueName": "panneauRainuréDe31mm",
                        "imageUrl": "/static/images/ico_Panneau%20rainure.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 126,
                        "hide": true
                    }
                ],
                "displayHint": "",
                "optionPrice": 0
            },
            "forme": {
                "displayHint": "standardOptionWithIcons",
                "optionName": "forme",
                "optionPrice": 0,
                "optionValues": [
                    {
                        "valueName": "dormantCintré",
                        "imageUrl": "/static/images/dormantCintré.png"
                    },
                    {
                        "valueName": "dormantPleinCintre",
                        "imageUrl": "/static/images/dormantPleinCintre.png"
                    },
                    {
                        "valueName": "vitrageCintreSurbaissé",
                        "imageUrl": "/static/images/vitrageCintreSurbaissé.png"
                    },
                    {
                        "valueName": "vitragePleinCintre",
                        "imageUrl": "/static/images/vitragePleinCintre.png"
                    },
                    {
                        "valueName": "formeOuvrantCintreSurbaissé",
                        "imageUrl": "/static/images/formeOuvrantCintreSurbaissé.png"
                    },
                    {
                        "valueName": "formeOuvrantPleinCintre",
                        "imageUrl": "/static/images/formeOuvrantPleinCintre.png"
                    }
                ],
                "defaultIndex": 0,
                "selectedIndex": 0
            },
            "typePose": {
                "displayHint": "standardOptionWithIcons",
                "optionName": "typePose",
                "optionPrice": 0,
                "optionValues": [
                    {
                        "valueName": "poseEnAppliqueIntérieur",
                        "imageUrl": "/static/images/ico_Frappe_Applique.jfif"
                    },
                    {
                        "valueName": "poseFeuillure",
                        "imageUrl": "/static/images/ico_Frappe_Feuillure.jfif"
                    },
                    {
                        "valueName": "poseRenovation",
                        "imageUrl": "/static/images/ico_Frappe_Renovation.jfif"
                    },
                    {
                        "valueName": "poseTunnel",
                        "imageUrl": "/static/images/ico_Frappe_Tunnel.jfif"
                    }
                ],
                "defaultIndex": 0,
                "selectedIndex": 0
            },
            "typeCote": {
                "displayHint": "standardOptionWithIcons",
                "optionName": "typeCote",
                "optionPrice": 0,
                "optionValues": [
                    {
                        "valueName": "dimensionsTableau",
                        "imageUrl": "/static/images/dimensionsTableau.png"
                    },
                    {
                        "valueName": "dimensionsFabricant",
                        "imageUrl": "/static/images/dimensionsFabricant.png"
                    }
                ],
                "defaultIndex": 0,
                "selectedIndex": 0
            },
            "dormant": {
                "displayHint": "standardOptionWithIcons",
                "optionName": "typePose",
                "optionPrice": 0,
                "optionValues": [
                    {
                        "valueName": "dormant60",
                        "imageUrl": "/static/images/dormant60.png"
                    },
                    {
                        "valueName": "dormant100",
                        "imageUrl": "/static/images/dormant100.png"
                    },
                    {
                        "valueName": "dormant120",
                        "imageUrl": "/static/images/dormant120.png"
                    },
                    {
                        "valueName": "dormant140",
                        "imageUrl": "/static/images/dormant140.png"
                    },
                    {
                        "valueName": "dormant60",
                        "imageUrl": "/static/images/dormant140.png"
                    },
                    {
                        "valueName": "dormant160",
                        "imageUrl": "/static/images/dormant160.png"
                    },
                    {
                        "valueName": "dormant180",
                        "imageUrl": "/static/images/dormant180.png"
                    },
                    {
                        "valueName": "dormant200",
                        "imageUrl": "/static/images/dormant200.png"
                    }
                ],
                "defaultIndex": 0,
                "selectedIndex": 0
            },
            "appuiEtSeuil": {
                "displayHint": "standardOptionWithIcons",
                "optionName": "appuiEtSeuil",
                "optionPrice": 0,
                "optionValues": [
                    {
                        "valueName": "appuiStandard",
                        "imageUrl": "/static/images/appuiStandard.png"
                    }
                ],
                "defaultIndex": 0,
                "selectedIndex": 0
            },
            "sensOuverture": {
                "displayHint": "standardOptionWithIcons",
                "optionName": "sensOuverture",
                "optionPrice": 0,
                "optionValues": [
                    {
                        "valueName": "sensADéfinir",
                        "imageUrl": "/static/images/sensADéfinir.png"
                    },
                    {
                        "valueName": "droiteTirant",
                        "imageUrl": "/static/images/droiteTirant.png"
                    },
                    {
                        "valueName": "gaucheTirant",
                        "imageUrl": "/static/images/gaucheTirant.png"
                    }
                ],
                "defaultIndex": 0,
                "selectedIndex": 0
            },
            "oscilloBattant": {
                "displayHint": "standardOptionWithIcons",
                "optionName": "oscilloBattant",
                "optionPrice": 0,
                "optionValues": [
                    {
                        "valueName": "oscilloBattant1Vantail",
                        "imageUrl": "/static/images/oscilloBattant1Vantail.png"
                    },
                    {
                        "valueName": "aucunOscilloBattant",
                        "imageUrl": "/static/images/aucune.png"
                    }
                ],
                "defaultIndex": 0,
                "selectedIndex": 0
            },
            "petitsBois": {
                "displayHint": "standardOptionWithIcons",
                "optionName": "petitsBois",
                "optionPrice": 0,
                "optionValues": [
                    {
                        "valueName": "aucun",
                        "imageUrl": "/static/images/aucune.png"
                    },
                    {
                        "valueName": "petitsBoisIncorporsMonocoloreBlanc901626x8",
                        "imageUrl": "/static/images/ico_Petits_Bois_Blanc_Incorpores_26.jpg"
                    },
                    {
                        "valueName": "petitsBoisIncorporsMonocoloreRAL26x8",
                        "imageUrl": "/static/images/ico_couleur_PB.jpg"
                    },
                    {
                        "valueName": "petitsBoisIncorporsBlancIntrieuretRALExtrieur26x8",
                        "imageUrl": "/static/images/ico_Petits_Bois_Blanc_Ext_Bois_Int_26.jpg"
                    },
                    {
                        "valueName": "petitsBoisIncorporsLaiton10x8",
                        "imageUrl": "/static/images/ico_Petits_Bois_Laiton_Incorpores_10.jpg"
                    },
                    {
                        "valueName": "PetitsBoisIncorporsTitane10x8",
                        "imageUrl": "/static/images/ico_Petits_Bois_Incorpor%C3%A9s_Titane_10.jpg"
                    },
                    {
                        "valueName": "petitsBoisRapportsDe45mm",
                        "imageUrl": "/static/images/ico_Petits_Bois_Blanc_Mortaises_45.jpg"
                    },
                    {
                        "valueName": "petitsBoisRapportsDe26mm",
                        "imageUrl": "/static/images/ico_Petits_Bois_Blanc_Mortaises_26.jpg"
                    }
                ],
                "defaultIndex": 0,
                "selectedIndex": 0
            },
            "dispositionPetitsBois": {
                "optionName": "dispositionPetitsBois",
                "displayHint": "standardOptionWithIcons",
                "optionValues": [
                    {
                        "valueName": "",
                        "imageUrl": ""
                    }
                ],
                "optionPrice": 0,
                "hide": true,
                "selectedIndex": -1,
                "selectedValueName": null,
                "valid": true
            },
            "sensOuvertureOb": 0,
            "soubassement": {
                "hide": true,
                "displayHint": "standardOptionWithIcons",
                "optionName": "soubassement",
                "optionPrice": 0,
                "optionValues": [
                    {
                        "valueName": "aucun",
                        "imageUrl": "/static/images/aucune.png"
                    },
                    {
                        "valueName": "sbPleinLisse",
                        "imageUrl": "/static/images/sbPleinLisse.png",
                        "precisions": [
                            {
                                "name": "soubassementHauteur",
                                "min": 200,
                                "max": 800,
                                "default": 400
                            }
                        ]
                    },
                    {
                        "valueName": "sbPlateBande",
                        "imageUrl": "/static/images/sbPlateBande.png",
                        "precisions": [
                            {
                                "name": "soubassementHauteur",
                                "min": 200,
                                "max": 800,
                                "default": 400
                            }
                        ]
                    },
                    {
                        "valueName": "sbVitre",
                        "imageUrl": "/static/images/sbVitre.png",
                        "precisions": [
                            {
                                "name": "soubassementHauteur",
                                "min": 200,
                                "max": 800,
                                "default": 400
                            }
                        ]
                    }
                ],
                "defaultIndex": 0,
                "selectedIndex": 0,
                "soubassementHauteur": 0,
                "precisionsSummaryText": [],
                "selectedValueName": ""
            },
            "vitragesMainSelection": {
                "optionName": "vitrage",
                "displayHint": "standardOptionWithIcons",
                "optionValues": [
                    {
                        "optionValueGroupName": "doubleVitrage",
                        "valueName": "doubleVitrageVIR416WarmEdgeArgon4",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_16_4-01.jpg",
                        "gamme": "gammePop",
                        "prixM2": 0
                    },
                    {
                        "optionValueGroupName": "doubleVitrage",
                        "valueName": "doubleVitrageVIR414WarmEdgeArgon6",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_14_6-01.jpg",
                        "gamme": "gammePop",
                        "prixM2": 41
                    },
                    {
                        "optionValueGroupName": "doubleVitrage",
                        "valueName": "doubleVitrageVIR620WarmEdgeArgon6",
                        "imageUrl": "/static/images/ico_img_Vitrages-6_20_6-01.jpg",
                        "gamme": "gammePop",
                        "prixM2": 49
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAutoNettoyant",
                        "valueName": "doubleVitrageVIR416WarmEdgeArgon4Autonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_16_4-03.jpg",
                        "gamme": "gammePop",
                        "prixM2": 136
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAutoNettoyant",
                        "valueName": "doubleVitrageVIR414WarmEdgeArgon6Autonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_14_6-03.jpg",
                        "gamme": "gammePop",
                        "prixM2": 213
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAutoNettoyant",
                        "valueName": "doubleVitrageVIR44214WarmEdgeArgon442Autonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-44%2C2_14_44%2C2-03.jpg",
                        "gamme": "gammePop",
                        "prixM2": 198
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAcoustique",
                        "valueName": "doubleVitrageAcoustiqueVIR420WarmEdgeArgon8",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_20_8-02.jpg",
                        "gamme": "gammePop",
                        "prixM2": 47
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAcoustique",
                        "valueName": "doubleVitrageAcoustiqueVIR1014WarmEdgeArgon441silence",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-02.jpg",
                        "gamme": "gammePop",
                        "prixM2": 194
                    },
                    {
                        "optionValueGroupName": "doubleVitrageSecurité",
                        "valueName": "doubleVitrageScuritVIR418WarmEdgeArgon442",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-03.jpg",
                        "gamme": "gammePop",
                        "prixM2": 80
                    },
                    {
                        "optionValueGroupName": "doubleVitrageSecurité",
                        "valueName": "doubleVitrageScuritVIR44218WarmEdgeArgon4",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-04.jpg",
                        "gamme": "gammePop",
                        "prixM2": 152
                    },
                    {
                        "optionValueGroupName": "doubleVitrageSecurité",
                        "valueName": "doubleVitrageScuritVIR44214WarmEdgeArgon442",
                        "imageUrl": "/static/images/ico_img_Vitrages-44%2C2_14_44%2C2-09.jpg",
                        "gamme": "gammePop",
                        "prixM2": 137
                    },
                    {
                        "optionValueGroupName": "remplissagePlein",
                        "valueName": "panneauMousseDe24mmPop",
                        "imageUrl": "/static/images/ico_Panneau%20mousse.jpg",
                        "gamme": "gammePop",
                        "prixM2": 126
                    },
                    {
                        "optionValueGroupName": "remplissagePlein",
                        "valueName": "panneauRainuréDe31mm",
                        "imageUrl": "/static/images/ico_Panneau%20rainure.jpg",
                        "gamme": "gammePop",
                        "prixM2": 126
                    },
                    {
                        "optionValueGroupName": "tripleVitrage",
                        "valueName": "TriplevitrageVIR418WarmEdgeargon418WarmEdgeargon4VIR",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-05.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 117,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageAutoNettoyant",
                        "valueName": "TriplevitrageVIR418WarmEdgeargon418WarmEdgeargon4VIRautonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-06.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 119,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageAutoNettoyant",
                        "valueName": "TriplevitrageVIR44215WarmEdgeargon415WarmEdgeargon4VIRautonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-07.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 313,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageAutoNettoyant",
                        "valueName": "TriplevitrageVIR44212WarmEdgeargon412WarmEdgeargon442VIRautonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-08.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 466,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageSecurite",
                        "valueName": "TriplevitrageVIR415WarmEdgeargon415WarmEdgeargon442VIR",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-09.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 213,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageSecurite",
                        "valueName": "TriplevitrageVIR414WarmEdgeargon414WarmEdgeargonSP10VIR",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-10.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 328,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageSecurite",
                        "valueName": "TriplevitrageVIR44212WarmEdgeargon412WarmEdgeargon442VIR",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-07.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 402,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "remplissagePlein",
                        "valueName": "panneauMousseDe24mmAdvance",
                        "imageUrl": "/static/images/ico_Panneau%20mousse.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 126,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "remplissagePlein",
                        "valueName": "panneauRainuréDe31mm",
                        "imageUrl": "/static/images/ico_Panneau%20rainure.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 126,
                        "hide": true
                    }
                ],
                "selectedIndex": 0,
                "selectedValue": {
                    "optionValueGroupName": "doubleVitrage",
                    "valueName": "doubleVitrageVIR416WarmEdgeArgon4",
                    "imageUrl": "/static/images/ico_img_Vitrages-4_16_4-01.jpg",
                    "gamme": "gammePop",
                    "prixM2": 0
                },
                "valid": true,
                "isManaged": true,
                "managedNode": "vitrages",
                "optionPrice": null
            },
            "validateVitrage": {
                "reason": "",
                "valid": true
            },
            "vitragePetitBois": 0,
            "soubassementVitrage": {
                "optionName": "soubassementVitrage",
                "displayHint": "standardOptionWithIcons",
                "optionValues": [
                    {
                        "valueName": "inheritVitrage",
                        "imageUrl": "/static/images/inheritVitrage.png",
                        "valid": "true",
                        "gamme": "",
                        "prixM2": 0
                    },
                    {
                        "optionValueGroupName": "doubleVitrage",
                        "valueName": "doubleVitrageVIR416WarmEdgeArgon4",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_16_4-01.jpg",
                        "gamme": "gammePop",
                        "prixM2": 0
                    },
                    {
                        "optionValueGroupName": "doubleVitrage",
                        "valueName": "doubleVitrageVIR414WarmEdgeArgon6",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_14_6-01.jpg",
                        "gamme": "gammePop",
                        "prixM2": 41
                    },
                    {
                        "optionValueGroupName": "doubleVitrage",
                        "valueName": "doubleVitrageVIR620WarmEdgeArgon6",
                        "imageUrl": "/static/images/ico_img_Vitrages-6_20_6-01.jpg",
                        "gamme": "gammePop",
                        "prixM2": 49
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAutoNettoyant",
                        "valueName": "doubleVitrageVIR416WarmEdgeArgon4Autonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_16_4-03.jpg",
                        "gamme": "gammePop",
                        "prixM2": 136
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAutoNettoyant",
                        "valueName": "doubleVitrageVIR414WarmEdgeArgon6Autonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_14_6-03.jpg",
                        "gamme": "gammePop",
                        "prixM2": 213
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAutoNettoyant",
                        "valueName": "doubleVitrageVIR44214WarmEdgeArgon442Autonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-44%2C2_14_44%2C2-03.jpg",
                        "gamme": "gammePop",
                        "prixM2": 198
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAcoustique",
                        "valueName": "doubleVitrageAcoustiqueVIR420WarmEdgeArgon8",
                        "imageUrl": "/static/images/ico_img_Vitrages-4_20_8-02.jpg",
                        "gamme": "gammePop",
                        "prixM2": 47
                    },
                    {
                        "optionValueGroupName": "doubleVitrageAcoustique",
                        "valueName": "doubleVitrageAcoustiqueVIR1014WarmEdgeArgon441silence",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-02.jpg",
                        "gamme": "gammePop",
                        "prixM2": 194
                    },
                    {
                        "optionValueGroupName": "doubleVitrageSecurité",
                        "valueName": "doubleVitrageScuritVIR418WarmEdgeArgon442",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-03.jpg",
                        "gamme": "gammePop",
                        "prixM2": 80
                    },
                    {
                        "optionValueGroupName": "doubleVitrageSecurité",
                        "valueName": "doubleVitrageScuritVIR44218WarmEdgeArgon4",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-04.jpg",
                        "gamme": "gammePop",
                        "prixM2": 152
                    },
                    {
                        "optionValueGroupName": "doubleVitrageSecurité",
                        "valueName": "doubleVitrageScuritVIR44214WarmEdgeArgon442",
                        "imageUrl": "/static/images/ico_img_Vitrages-44%2C2_14_44%2C2-09.jpg",
                        "gamme": "gammePop",
                        "prixM2": 137
                    },
                    {
                        "optionValueGroupName": "remplissagePlein",
                        "valueName": "panneauMousseDe24mmPop",
                        "imageUrl": "/static/images/ico_Panneau%20mousse.jpg",
                        "gamme": "gammePop",
                        "prixM2": 126
                    },
                    {
                        "optionValueGroupName": "remplissagePlein",
                        "valueName": "panneauRainuréDe31mm",
                        "imageUrl": "/static/images/ico_Panneau%20rainure.jpg",
                        "gamme": "gammePop",
                        "prixM2": 126
                    },
                    {
                        "optionValueGroupName": "tripleVitrage",
                        "valueName": "TriplevitrageVIR418WarmEdgeargon418WarmEdgeargon4VIR",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-05.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 117,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageAutoNettoyant",
                        "valueName": "TriplevitrageVIR418WarmEdgeargon418WarmEdgeargon4VIRautonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-06.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 119,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageAutoNettoyant",
                        "valueName": "TriplevitrageVIR44215WarmEdgeargon415WarmEdgeargon4VIRautonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-07.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 313,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageAutoNettoyant",
                        "valueName": "TriplevitrageVIR44212WarmEdgeargon412WarmEdgeargon442VIRautonettoyant",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-08.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 466,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageSecurite",
                        "valueName": "TriplevitrageVIR415WarmEdgeargon415WarmEdgeargon442VIR",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-09.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 213,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageSecurite",
                        "valueName": "TriplevitrageVIR414WarmEdgeargon414WarmEdgeargonSP10VIR",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-10.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 328,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "tripleVitrageSecurite",
                        "valueName": "TriplevitrageVIR44212WarmEdgeargon412WarmEdgeargon442VIR",
                        "imageUrl": "/static/images/ico_img_Vitrages-Specifique-07.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 402,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "remplissagePlein",
                        "valueName": "panneauMousseDe24mmAdvance",
                        "imageUrl": "/static/images/ico_Panneau%20mousse.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 126,
                        "hide": true
                    },
                    {
                        "optionValueGroupName": "remplissagePlein",
                        "valueName": "panneauRainuréDe31mm",
                        "imageUrl": "/static/images/ico_Panneau%20rainure.jpg",
                        "gamme": "gammeAdvance",
                        "prixM2": 126,
                        "hide": true
                    }
                ],
                "selectedIndex": -1,
                "hide": true,
                "isManaged": true,
                "managedNode": "vitrages",
                "optionPrice": null
            },
            "traverse": {
                "displayHint": "standardOptionWithIcons",
                "optionName": "traverse",
                "optionPrice": 0,
                "optionValues": [
                    {
                        "valueName": "aucun",
                        "imageUrl": "/static/images/aucune.png"
                    },
                    {
                        "valueName": "traverse1",
                        "imageUrl": "/static/images/traverse1.png"
                    },
                    {
                        "valueName": "traverse2",
                        "imageUrl": "/static/images/traverse2.png"
                    }
                ],
                "defaultIndex": 0,
                "selectedIndex": 0
            },
            "meneau": {
                "displayHint": "standardOptionWithIcons",
                "optionName": "meneau",
                "optionPrice": 0,
                "optionValues": [
                    {
                        "valueName": "aucun",
                        "imageUrl": "/static/images/aucune.png"
                    },
                    {
                        "valueName": "meneau1",
                        "imageUrl": "/static/images/meneau1.png"
                    },
                    {
                        "valueName": "meneau1Haute",
                        "imageUrl": "/static/images/meneau1Haute.png"
                    }
                ],
                "defaultIndex": 0,
                "selectedIndex": 0
            },
            "soubassementTraverseMeneau": 0,
            "couleur": {
                "displayHint": "standardOptionWithIcons",
                "optionName": "couleur",
                "optionValues": [
                    {
                        "valueName": "blancTeintéMasse",
                        "imageUrl": "/static/images/blancTeintéMasse.png",
                        "hide": true,
                        "coefIntérieur": 1
                    },
                    {
                        "valueName": "beigeTeintéMasse",
                        "imageUrl": "/static/images/beigeTeintéMasse.png",
                        "hide": false,
                        "coefIntérieur": 1
                    },
                    {
                        "valueName": "grisTeintéMasse",
                        "imageUrl": "/static/images/grisTeintéMasse.png",
                        "hide": false,
                        "coefIntérieur": 1
                    },
                    {
                        "valueName": "blancChêneDoré",
                        "imageUrl": "/static/images/blancChêneDoré.png",
                        "hide": true,
                        "coefIntérieur": 1.2
                    },
                    {
                        "valueName": "chêneDoré",
                        "imageUrl": "/static/images/chêneDoré.png",
                        "hide": false,
                        "coefIntérieur": 1.35
                    },
                    {
                        "valueName": "grisAnthracite",
                        "imageUrl": "/static/images/grisAnthracite.png",
                        "hide": false,
                        "coefIntérieur": 1.2
                    }
                ],
                "optionPrice": 0,
                "defaultIndex": 0,
                "selectedIndex": 0,
                "valid": false
            },
            "gammeCouleurForme": 0,
            "listeOptionsChoisis": {
                "liste": [],
                "totalPrice": 0
            },
            "prixProduit": {
                "prixTarif": 0,
                "prixDAchat": 0,
                "prixDeVente": 0
            },
            "prixRemise": {
                "remiseUnitaire": 0,
                "remisePct": 0,
                "prixDeVenteClient": 0
            },
            "margeVendeur": {
                "margeUnitaire": 0,
                "margeGlobale": 0,
                "tauxDeMarge": null
            },
            "tvaTotalTtc": {
                "tauxTva": 0.2,
                "totalTtc": 0,
                "totalHt": 0
            },
            "ready": true
        },
        "methods": {
            "conditionsAchatVente": [],
            "produit": [],
            "dimensions": [],
            "gamme": [],
            "forme": [],
            "typePose": [],
            "typeCote": [],
            "dormant": [],
            "appuiEtSeuil": [],
            "sensOuverture": [],
            "oscilloBattant": [],
            "petitsBois": [],
            "dispositionPetitsBois": [],
            "soubassement": [],
            "vitragesMainSelection": [],
            "validateVitrage": [],
            "soubassementVitrage": [],
            "traverse": [],
            "meneau": [],
            "couleur": ["onChange"],
            "prixRemise": [],
            "tvaTotalTtc": []
        },
        "initiator": "gamme"
    }
}