import { redirect } from "next/navigation";
import Header from "../components/header";
import { getServerSession } from 'next-auth'


export default async function Profile() {
    const session = await getServerSession()
    if (!session) {
        redirect('/')
    }
    return (
        <body className="bg-gradient-to-r from-indigo-800 to-blue-900 min-h-screen p-4">
            <Header session={session} />
            <br />
            <div className="font-std mb-10 w-full rounded-2xl bg-white p-10 font-normal leading-relaxed text-gray-900 shadow-xl">

                <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row justify-between mb-5 items-start">
                        <h2 className="mb-5 text-4xl font-bold text-blue-900">Update Profile</h2>
                        <div className="text-center">
                            <div>
                                <img src={session?.user?.image || 'https://cdn-icons-png.flaticon.com/512/3106/3106921.png'} alt="Profile Picture" className="rounded-full w-32 h-32 mx-auto border-4 border-indigo-800 mb-4 transition-transform duration-300 hover:scale-105 ring ring-gray-300" />
                                <input type="file" name="profile" id="upload_profile" hidden required />

                                <label htmlFor="upload_profile" className="inline-flex items-center">
                                    <svg data-slot="icon" className="w-5 h-5 text-blue-700" fill="none" strokeWidth="1.5"
                                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                        </path>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                        </path>
                                    </svg>
                                </label>
                            </div>
                            <button className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 ring ring-gray-300 hover:ring-indigo-300">
                                Change Profile Picture
                            </button>
                        </div>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" value={session?.user?.name || ''} />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-400 focus:ring-indigo-500 focus:border-indigo-500" value={session?.user?.email || ''} disabled/>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700">Save Changes</button>
                        </div>
                    </form>
                </div>

            </div>
        </body>
    )
}