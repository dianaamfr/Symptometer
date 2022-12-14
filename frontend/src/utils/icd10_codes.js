var groups = [
    {"start":"A00", "end":"B99", "group":" Certain infectious and parasitic diseases"}, 
    {"start":"C00", "end":"D49", "group":"Neoplasms"}, 
    {"start":"D50", "end":"D89", "group":" Diseases of the blood and blood-forming organs and certain disorders involving the immune mechanism"}, 
    {"start":"E00", "end":"E89", "group":"Endocrine, nutritional and metabolic diseases"}, 
    {"start":"F01", "end":"F99", "group":"Mental, Behavioral and Neurodevelopmental disorders"}, 
    {"start":"G00", "end":"G99", "group":"Diseases of the nervous system"}, 
    {"start":"H00", "end":"H59", "group":"Diseases of the eye and adnexa"}, 
    {"start":"H60", "end":"H95",  "group":"Diseases of the ear and mastoid process"}, 
    {"start":"I00", "end":"I99", "group":"Diseases of the circulatory system"}, 
    {"start":"J00", "end":"J99", "group":"Diseases of the respiratory system"}, 
    {"start":"K00", "end":"K95", "group":"Diseases of the digestive system"}, 
    {"start":"L00", "end":"L99", "group":"Diseases of the skin and subcutaneous tissue"}, 
    {"start":"M00", "end":"M99",  "group":"Diseases of the musculoskeletal system and connective tissue"}, 
    {"start":"N00", "end":"N99",  "group":"Diseases of the genitourinary system"}, 
    {"start":"O00", "end":"O9A",  "group":"Pregnancy, childbirth and the puerperium"}, 
    {"start":"P00", "end":"P96",  "group":"Certain conditions originating in the perinatal period"}, 
    {"start":"Q00", "end":"Q99",  "group":"Congenital malformations, deformations and chromosomal abnormalities"}, 
    {"start":"R00", "end":"R99",  "group":"Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified"}, 
    {"start":"S00", "end":"T88",  "group":"Injury, poisoning and certain other consequences of external causes"}, 
    {"start":"U00", "end":"U85",  "group":"Codes for special purposes"}, 
    {"start":"V00", "end":"Y99",  "group":"External causes of morbidity"}, 
    {"start":"Z00", "end":"Z99",  "group":"Factors influencing health status and contact with health services"}, 
]

//Example: ICD10CM:E88
export function getDiseaseGroup(diseaseICD){
    for (var i=0; i < groups.length; i++) {
        if(diseaseICD.substring(8,11) >= groups[i].start && 
            diseaseICD.substring(8,11) <= groups[i].end ){
                return groups[i].group
        }
    }
}

export function addDiseaseGroup(diseases) {
    diseases.forEach((disease) => {
        disease.group = [];
        if(disease.icds) {
            disease.icds.value.split(",").forEach((icd) => {
                if (disease.group.indexOf(getDiseaseGroup(icd)) === -1) {
                    disease.group.push(getDiseaseGroup(icd));
                }
            });
        }
    });
}
