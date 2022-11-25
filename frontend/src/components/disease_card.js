
import { Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

function DiseaseCard({ disease }) {

    const navigate = useNavigate();

    async function goToDiseasePage(){
        navigate('/disease');
    }

    return (
        

        <div className="hover:bg-gray-400 hover:bg-opacity-10 mx-0 mt-3 relative block p-8 overflow-hidden border border-slate-100 rounded-lg ml-6 mr-6"
            >
                <button className="flex text-left  " onClick={goToDiseasePage}>
            <span
                className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 to-blue-500"
            ></span>

            <div className="justify-between sm:flex">
                <Col className="col-9">
                    <div>
                        <h5 className="text-xl font-bold text-slate-900">
                            {disease.diseaseName.value}
                        </h5>
                        <p className="mt-1 text-xs font-medium text-slate-600">Disease Group: {disease.group}</p>
                    </div>

                    <div className="mt-1 sm:pr-8">
                        <p className="text-sm text-slate-500">
                            {disease.definition.value}
                        </p>
                    </div>

                   
                </Col>
                <Col className="col-3">
                    <div className="flex-shrink-0 hidden ml-3 sm:block">
                        <h6 className="text font-bold text-slate-900">
                            Symptoms
                        </h6>
                        <p className="mt-1 text-xs font-medium text-slate-600">Symptom 1</p>
                        <p className="mt-1 text-xs font-medium text-slate-600">Symptom 2</p>
                    </div>
                </Col>

            </div>
            </button>
        </div>
  
        
    )
}

export default DiseaseCard;
