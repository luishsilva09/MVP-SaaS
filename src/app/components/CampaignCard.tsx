type CampaignCardProps = {
    title: string;
    objective: string;
    audience: string;
    metrics: string;
    onSelect?: () => void;
};

export default function CampaignCard({
    title,
    objective,
    audience,
    metrics,
    onSelect,
}: CampaignCardProps) {
    return (
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between h-full">
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
                <p className="text-sm text-gray-600 mb-1"><strong>Objetivo:</strong> {objective}</p>
                <p className="text-sm text-gray-600 mb-1"><strong>Público:</strong> {audience}</p>
                <p className="text-sm text-gray-600 mb-4"><strong>Métricas:</strong> {metrics}</p>
                <p className="text-gray-700 text-sm italic">
                    Aproveite esta campanha para maximizar seus resultados agora mesmo!
                </p>
            </div>
            <button
                onClick={onSelect}
                className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition"
            >
                Selecionar campanha
            </button>
        </div>
    );
}
