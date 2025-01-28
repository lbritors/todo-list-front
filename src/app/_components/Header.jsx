
export default function Header() {
    return(
        <div className="fixed top-0 left-0 z-50 right-0 flex justify-between items-center p-4 bg-gray-800 text-white w-full">
            <h1 className="text-2xl font-bold">My APP</h1>
            <div className="flex space-x-4">
                <a href="#" className="hover:underline">Home</a>
                <a href="#" className="hover:underline">About</a>
                <a href="#" className="hover:underline">Contact</a>
            </div>
        </div>
    )
}