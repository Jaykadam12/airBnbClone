 function About({user}) {
   return (
     <div className="flex-1 pl-32 py-20 border-l border-gray-200 ml-20">
       <div className="flex  justify-between items-center mb-6">
         <h2 className="text-3xl font-semibold">About me</h2>
         <button className="border px-4 py-1 rounded-md font-medium">
           Edit
         </button>
       </div>

       <div className="flex  gap-8">
         {/* Card */}
         <div className="bg-white rounded-3xl shadow-xl p-6 w-80 text-center">
           <div className="w-24 h-24 rounded-full bg-black text-white text-4xl font-bold flex items-center justify-center mx-auto mb-4">
             {user?.email?.charAt(0).toUpperCase()}
           </div>
           <h3 className="text-xl font-bold">{user.email}</h3>
           <p className="text-gray-500">Guest</p>
         </div>

         {/* Right Info */}
         <div className="flex-1 space-y-4">
           <h4 className="text-xl font-semibold">Complete your profile</h4>
           <p className="text-gray-600 max-w-md">
             Your Airbnb profile is an important part of every reservation.
             Create yours to help other hosts and guests get to know you.
           </p>
         </div>
       </div>

       {/* Reviews */}
       <div className="mt-10">
         <p className="flex items-center text-gray-800 font-medium">
           🗨️ <span className="ml-2">Reviews I’ve written</span>
         </p>
       </div>
     </div>
   );
 }
 export default About;