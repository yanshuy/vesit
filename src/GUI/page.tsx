import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function GUI() {
    const navigate = useNavigate();
    return (
        <div className="grid min-h-screen place-items-center">
            <Button
                onClick={() => navigate("/gui/map/1")}
                className="border-2 bg-white p-6 text-xl font-light text-black shadow-none hover:bg-gray-100"
            >
                Book new
            </Button>
        </div>
    );
}
