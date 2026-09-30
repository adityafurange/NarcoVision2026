// Curated Forensic & Toxicological Dataset
// Sources: PubChem (NIH), DrugBank, and Tox21 Federal Research Initiative

export const substances = [
  {
    id: 'SUB-001',
    name: 'Cocaine Hydrochloride',
    commonName: 'Cocaine',
    chemicalFormula: 'C17H21NO4',
    molecularWeight: '303.35 g/mol',
    casNumber: '53-21-4',
    iupacName: 'methyl (1R,2R,3S,5S)-3-(benzoyloxy)-8-methyl-8-azabicyclo[3.2.1]octane-2-carboxylate',
    smiles: 'CN1C2CCC1C(C(C2)OC(=O)C3=CC=CC=C3)C(=O)OC',
    class: 'Stimulant / Tropane Alkaloid',
    schedule: 'Schedule II',
    sources: {
      pubchem: {
        cid: 446220,
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/446220',
        safetySummary: 'GHS06 (Toxic), GHS08 (Health Hazard)'
      },
      drugbank: {
        id: 'DB00907',
        url: 'https://go.drugbank.com/drugs/DB00907',
        category: 'Local Anesthetic / Dopamine Uptake Inhibitor'
      },
      tox21: {
        assayId: 'TOX21_201832',
        target: 'Dopamine Transporter (DAT) / hERG channel',
        activity: 'Active (Agonist / Blocker)'
      }
    },
    presumptiveTesting: {
      reagent: "Scott's Reagent / Cobalt Thiocyanate",
      expectedColor: 'Blue precipitate / Blue organic layer with chloroform',
      typicalReactionTimeSec: 15,
      compatibleKitId: 'KIT-003'
    }
  },
  {
    id: 'SUB-002',
    name: 'Fentanyl Citrate',
    commonName: 'Fentanyl',
    chemicalFormula: 'C22H28N2O',
    molecularWeight: '336.47 g/mol',
    casNumber: '437-38-7',
    iupacName: 'N-phenyl-N-[1-(2-phenylethyl)piperidin-4-yl]propanamide',
    smiles: 'CCC(=O)N(C1=CC=CC=C1)C2CCN(CC2)CCC3=CC=CC=C3',
    class: 'Synthetic Opioid / Analgesic',
    schedule: 'Schedule II',
    sources: {
      pubchem: {
        cid: 3345,
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/3345',
        safetySummary: 'GHS06 (Fatal if swallowed/inhaled), GHS08'
      },
      drugbank: {
        id: 'DB00813',
        url: 'https://go.drugbank.com/drugs/DB00813',
        category: 'Opioid mu-Receptor Agonist (50-100x potency of Morphine)'
      },
      tox21: {
        assayId: 'TOX21_114092',
        target: 'Mu-type opioid receptor (OPRM1) / CYP3A4 pathway',
        activity: 'High-affinity active binder'
      }
    },
    presumptiveTesting: {
      reagent: 'Marquis Reagent / Fentanyl Lateral Flow Immunoassay',
      expectedColor: 'Light Orange-Brown (Marquis) / Single Test Line (Strip Positive)',
      typicalReactionTimeSec: 45,
      compatibleKitId: 'KIT-003'
    }
  },
  {
    id: 'SUB-003',
    name: 'Methamphetamine',
    commonName: 'Crystal Meth / Desoxyephedrine',
    chemicalFormula: 'C10H15N',
    molecularWeight: '149.23 g/mol',
    casNumber: '537-46-2',
    iupacName: '(2S)-N-methyl-1-phenylpropan-2-amine',
    smiles: 'CC(CC1=CC=CC=C1)NC',
    class: 'Central Nervous System Stimulant',
    schedule: 'Schedule II',
    sources: {
      pubchem: {
        cid: 10836,
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/10836',
        safetySummary: 'GHS06 (Toxic), GHS08 (Reproductive Toxicity)'
      },
      drugbank: {
        id: 'DB01576',
        url: 'https://go.drugbank.com/drugs/DB01576',
        category: 'Adrenergic Uptake Inhibitor / TAAR1 Agonist'
      },
      tox21: {
        assayId: 'TOX21_302194',
        target: 'Vesicular monoamine transporter 2 (VMAT2)',
        activity: 'Disruptor / Cytotoxic in dopaminergic neuron assays'
      }
    },
    presumptiveTesting: {
      reagent: "Marquis Reagent followed by Simon's Reagent",
      expectedColor: 'Orange-to-Brown (Marquis) -> Vivid Cobalt Blue (Simon)',
      typicalReactionTimeSec: 10,
      compatibleKitId: 'KIT-003'
    }
  },
  {
    id: 'SUB-004',
    name: 'Heroin (Diacetylmorphine)',
    commonName: 'Heroin / Diamorphine',
    chemicalFormula: 'C21H23NO5',
    molecularWeight: '369.41 g/mol',
    casNumber: '561-27-3',
    iupacName: '[(5R,6S)-4,5-epoxy-17-methyl-6-acetyloxy-morphinan-3-yl] acetate',
    smiles: 'CC(=O)OC1C=CC2C3CC4=C5C2(C1O5)CCN(C3C4)C.OC(=O)C',
    class: 'Semi-synthetic Opioid',
    schedule: 'Schedule I',
    sources: {
      pubchem: {
        cid: 5462328,
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/5462328',
        safetySummary: 'GHS06 (Acute Toxicity), GHS08'
      },
      drugbank: {
        id: 'DB01452',
        url: 'https://go.drugbank.com/drugs/DB01452',
        category: 'Pro-drug rapidly metabolized to 6-MAM and Morphine'
      },
      tox21: {
        assayId: 'TOX21_204101',
        target: 'OPRM1 / G-protein coupled receptor kinase',
        activity: 'High potency receptor recruitment'
      }
    },
    presumptiveTesting: {
      reagent: 'Marquis Reagent / Mecke Reagent',
      expectedColor: 'Deep Purple-Violet (Marquis) / Dark Green (Mecke)',
      typicalReactionTimeSec: 20,
      compatibleKitId: 'KIT-003'
    }
  },
  {
    id: 'SUB-005',
    name: 'Delta-9-Tetrahydrocannabinol',
    commonName: 'THC',
    chemicalFormula: 'C21H30O2',
    molecularWeight: '314.46 g/mol',
    casNumber: '1972-08-3',
    iupacName: '(6aR,10aR)-6,6,9-trimethyl-3-pentyl-6a,7,8,10a-tetrahydrobenzo[c]chromen-1-ol',
    smiles: 'CCCCCC1=CC(=C2C(=C1)OC(C3C2C=C(CC3)C)(C)C)O',
    class: 'Phytocannabinoid / Psychoactive Compound',
    schedule: 'Schedule I',
    sources: {
      pubchem: {
        cid: 16078,
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/16078',
        safetySummary: 'GHS07 (Harmful), GHS08'
      },
      drugbank: {
        id: 'DB07013',
        url: 'https://go.drugbank.com/drugs/DB07013',
        category: 'Cannabinoid CB1 and CB2 Receptor Partial Agonist'
      },
      tox21: {
        assayId: 'TOX21_110940',
        target: 'Cannabinoid CB1 receptor / PXR activation assay',
        activity: 'Active CB1 agonist'
      }
    },
    presumptiveTesting: {
      reagent: 'Duquenois-Levine Reagent (D-L)',
      expectedColor: 'Purple / Indigo extraction into lower chloroform layer',
      typicalReactionTimeSec: 60,
      compatibleKitId: 'KIT-003'
    }
  },
  {
    id: 'SUB-006',
    name: 'MDMA (3,4-Methylenedioxymethamphetamine)',
    commonName: 'Ecstasy / Molly',
    chemicalFormula: 'C11H15NO2',
    molecularWeight: '193.24 g/mol',
    casNumber: '42542-10-9',
    iupacName: '1-(1,3-benzodioxol-5-yl)-N-methylpropan-2-amine',
    smiles: 'CC(CC1=CC2=C(C=C1)OCO2)NC',
    class: 'Entactogen / Substituted Phenethylamine',
    schedule: 'Schedule I',
    sources: {
      pubchem: {
        cid: 1615,
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/1615',
        safetySummary: 'GHS06 (Fatal), GHS08'
      },
      drugbank: {
        id: 'DB01454',
        url: 'https://go.drugbank.com/drugs/DB01454',
        category: 'Serotonin-Norepinephrine-Dopamine Reuptake Inhibitor'
      },
      tox21: {
        assayId: 'TOX21_114502',
        target: '5-HT2A Serotonergic signaling / SERT',
        activity: 'Active neurochemical substrate'
      }
    },
    presumptiveTesting: {
      reagent: 'Marquis Reagent / Mandelin Reagent',
      expectedColor: 'Instant Dark Purple to Midnight Black',
      typicalReactionTimeSec: 5,
      compatibleKitId: 'KIT-003'
    }
  },
  {
    id: 'SUB-007',
    name: 'Diazepam',
    commonName: 'Valium',
    chemicalFormula: 'C16H13ClN2O',
    molecularWeight: '284.74 g/mol',
    casNumber: '439-14-5',
    iupacName: '7-chloro-1-methyl-5-phenyl-3H-1,4-benzodiazepin-2-one',
    smiles: 'CN1C(=O)CN=C(C2=C1C=CC(=C2)Cl)C3=CC=CC=C3',
    class: 'Benzodiazepine / Sedative-Hypnotic',
    schedule: 'Schedule IV',
    sources: {
      pubchem: {
        cid: 3016,
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/3016',
        safetySummary: 'GHS07 (Harmful), GHS08'
      },
      drugbank: {
        id: 'DB00829',
        url: 'https://go.drugbank.com/drugs/DB00829',
        category: 'GABA-A Receptor Positive Allosteric Modulator'
      },
      tox21: {
        assayId: 'TOX21_110022',
        target: 'GABRB3 / PXR Nuclear Receptor',
        activity: 'Active in Tox21 Phase II Nuclear Receptor Screening'
      }
    },
    presumptiveTesting: {
      reagent: 'Zimmermann Reagent / Formaldehyde-H2SO4',
      expectedColor: 'Reddish-orange or deep yellow',
      typicalReactionTimeSec: 30,
      compatibleKitId: 'KIT-003'
    }
  },
  {
    id: 'SUB-008',
    name: 'Strychnine (Forensic Toxin)',
    commonName: 'Strychnine Alkaloid',
    chemicalFormula: 'C21H22N2O2',
    molecularWeight: '334.41 g/mol',
    casNumber: '57-24-9',
    iupacName: 'strychnidin-10-one',
    smiles: 'C1CC23C4CC5C6C7C8=CC=CC=C8N7C(=O)CC2C(=CCO3)C5(CC16)CC4',
    class: 'Neurotoxic Indole Alkaloid / Pesticide Toxin',
    schedule: 'Highly Regulated Toxic Poison',
    sources: {
      pubchem: {
        cid: 441071,
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/441071',
        safetySummary: 'GHS06 (Fatal if swallowed/inhaled), GHS09 (Environmental Danger)'
      },
      drugbank: {
        id: 'DB01445',
        url: 'https://go.drugbank.com/drugs/DB01445',
        category: 'Glycine Receptor Antagonist / Lethal Convulsant'
      },
      tox21: {
        assayId: 'TOX21_300452',
        target: 'Mitochondrial Membrane Potential (SR-MMP) / Apoptosis',
        activity: 'Extremely cytotoxic at sub-micromolar thresholds'
      }
    },
    presumptiveTesting: {
      reagent: 'Mandelin Reagent (Ammonium vanadate in H2SO4)',
      expectedColor: 'Vivid Blue turning to Violet, then Reddish-Orange',
      typicalReactionTimeSec: 15,
      compatibleKitId: 'KIT-005'
    }
  }
];

export const getSubstanceById = (id) => substances.find((s) => s.id === id);
