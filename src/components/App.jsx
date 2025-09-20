// create your App component here
import { useEffect, useState } from "react";

function App() {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);

    async function fetchDog() {
        try {
            setLoading(true);
            const res = await fetch("https://dog.ceo/api/breeds/image/random");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setImageUrl(data.message);
        } catch (err) {
            setImageUrl("");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDog();
    }, []);

    return(
        <div className="app">
            <h1>Random Dog</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                imageUrl && (
                    <img 
                        src={imageUrl}
                        alt="Random dog"
                    />
                )
            )}
            <div>
                <button onClick={fetchDog}>Fetch New Dog</button>
            </div>
        </div>
    );
}

export default App;