import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { updateUser } from "../../redux/slices/userSlice";

function Preferences({ profile = {} }) {
  const { email, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formBody = {
      first_name: form.first_name.value.trim(),
      last_name: form.last_name.value.trim(),
      phone_number: form.phone.value.trim(),
    };

    const formData = new FormData();
    Object.entries(formBody).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/users/`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || response.statusText);

      if (result.success) {
        // console.log(result);
        toast.success("Profile updated successfully!");

        setTimeout(() => {
          dispatch(updateUser(formBody));
        }, 800);

        // setTimeout(() => navigate(0), 1500);
      } else {
        toast.error(result.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleUpdate}>
      <Toaster />

      {/* --- Details Information --- */}
      <div className="account bg-white rounded-2xl p-[1.5rem_2rem]">
        <h5 className="text-[#14142B] font-semibold border-b border-[#DEDEDE] pb-[.75rem] mb-[2rem]">
          Details Information
        </h5>

        <div className="grid grid-cols-2 gap-[1.5rem]">
          <InputField id="first_name" label="First Name" defaultValue={profile.first_name || ""} />
          <InputField id="last_name" label="Last Name" defaultValue={profile.last_name || ""} />
          <InputField id="email" label="E-mail" type="email" disabled defaultValue={email || ""} />
          <InputField id="phone" label="Phone Number" defaultValue={profile.phone_number || ""} />
        </div>
      </div>

      {/* --- Account and Privacy --- */}
      <div className="account bg-white rounded-2xl p-[1.5rem_2rem]">
        <h5 className="text-[#14142B] font-semibold border-b border-[#DEDEDE] pb-[.75rem] mb-[2rem]">
          Account and Privacy
        </h5>

        <div className="grid grid-cols-2 gap-[1.5rem]">
          <InputField label="New Password" type="password" placeholder="Write your password" />
          <InputField label="Confirm Password" type="password" placeholder="Confirm your password" />
        </div>
      </div>

      {/* --- Submit Button --- */}
      <button
        disabled={isSubmitting}
        className={`w-fit bg-[#1D4ED8] p-[.75rem_5rem] rounded-xl text-white font-medium 
          hover:opacity-80 hover:cursor-pointer self-center md:self-start
          ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isSubmitting ? "Updating..." : "Update changes"}
      </button>
    </form>
  );
}

function InputField({ id, label, type = "text", defaultValue = "", disabled = false, placeholder }) {
  return (
    <div className="flex flex-col gap-[.75rem]">
      <label htmlFor={id} className="text-sm text-[#4E4B66]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
      />
    </div>
  );
}

export default Preferences;

// // import { useSelector } from "react-redux"
// // import { useContext } from 'react';
// import { useSelector } from "react-redux";
// import { orderContext as OrderContext } from "../../context/order/orderContext";
// import { useNavigate } from "react-router";
// import toast, { Toaster } from 'react-hot-toast';

// function Preferences({profile}) {
//   // const user = useSelector((state) => state.currUser.currUser);
//   const { email } = useSelector((state) => state.auth);
//   // const { fname, pnumber } = useSelector((state) => state.userInfo);
//   // const splitName = fname && fname.split(" ");
//   const { token } = useSelector((state) => state.auth);
//   // const [profile, setProfile] = useState({});
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const url = `${import.meta.env.VITE_BASE_API_URL}/users/`;
//   //   const options = {
//   //     method: "GET",
//   //     headers: {
//   //       Authorization: `Bearer ${token.token}`,
//   //     },
//   //   };
//   //   const request = new Request(url, options);

//   //   fetch(request)
//   //     .then((resp) => {
//   //       if (!resp.ok) throw resp.statusText;
//   //       return resp.json()
//   //     })
//   //     .then(res => setProfile(res.result))
//   //     .catch(err => console.log(err))
//   // }, [profile]);

//   function handleUpdate(e) {
//     e.preventDefault();

//     const form = e.target;
//     const formBody = {
//       first_name: form.first_name.value,
//       last_name: form.last_name.value,
//       phone_number: form.phone.value,
//     };
//     // let body = {};
//     const url = `${import.meta.env.VITE_BASE_API_URL}/users/`;
//     const options = {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const request = new Request(url, options);
//     const formdat = new FormData();

//     for (const prop in formBody) {
//       if (formBody[prop] == "" ||
//         formBody[prop] == null
//       ) {
//         continue;
//       }

//       formdat.append(prop, formBody[prop]);
//       // Object.assign(body, {
//       //   [prop]: formBody[prop]
//       // })
//     }
//     fetch(request, {
//       body: formdat
//     })
//       .then((resp) => {
//         if (!resp.ok) throw resp.statusText;
//         return resp.json();
//       })
//       .then(res => {
//         if (res.success) {
//           form.btn.disabled = true;
//           toast.success("update profile succesfully")
//           setTimeout(() => {
//             navigate(0);
//           }, 1800);
//         }
//       })
//       .catch(err => console.log(err));
//     // console.log(body)
//   }

//   return (
//     <form
//       className="flex flex-col gap-6"
//       onSubmit={handleUpdate}
//     >
//       <Toaster />
//       <div
//         className="account p-[1.5rem_2rem] rounded-2xl px-[2rem] py-[1.5rem] account-2 bg-white">
//         <h5
//           className="text-[#14142B] font-semibold border-b border-[#DEDEDE] pb-[.75rem] mb-[2rem]">
//           Details Information</h5>
//         <div className="grid grid-cols-2 gap-[1.5rem] grid-details">
//           <div className="frname flex flex-col gap-[.75rem] detail-1">
//             <label className="text-sm text-[#4E4B66]" htmlFor="first_name">First
//               Name</label>
//             <input
//               id="first_name" name="first_name"
//               className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
//               type="text"
//               defaultValue={
//                 profile.first_name ?
//                   profile.first_name :
//                   ""
//               }
//             />
//           </div>
//           <div className="detail flex flex-col gap-[.75rem] detail-2">
//             <label className="text-sm text-[#4E4B66]" htmlFor="last_name">Last
//               Name</label>
//             <input
//               id="last_name" name="last_name"
//               className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
//               type="text"
//               defaultValue={
//                 profile.last_name ?
//                   profile.last_name :
//                   ""
//               }
//             />
//           </div>
//           <div className="detail flex flex-col gap-[.75rem] detail-3">
//             <label className="text-sm text-[#4E4B66]" htmlFor="email">E-mail</label>
//             <input
//               disabled
//               className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
//               type="email" name="email" id="email" defaultValue={
//                 email
//               } />
//           </div>
//           <div className="detail flex flex-col gap-[.75rem] detail-4">
//             <label className="text-sm text-[#4E4B66]" htmlFor="phone">
//               Phone Number
//             </label>
//             <input
//               id="phone" name="phone"
//               className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
//               type="text"
//               defaultValue={
//                 profile.phone_number ?
//                   profile.phone_number :
//                   ""
//               }
//             />
//           </div>
//         </div>
//       </div>
//       <div className="account p-[1.5rem_2rem] rounded-2xl account-3 bg-white">
//         <h5
//           className="text-[#14142B] font-semibold border-b border-[#DEDEDE] 
//             pb-[.75rem] mb-[2rem]">
//           Account and Privacy</h5>
//         <div className="grid grid-cols-2 gap-[1.5rem] ch-pass-grid">
//           <div className="pass flex flex-col gap-[.75rem] pass-1">
//             <label className="text-sm text-[#4E4B66]" htmlFor="">New
//               Password</label>
//             <input
//               className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
//               type="password" name="" id=""
//               placeholder="Write your password" />
//           </div>
//           <div className="pass flex flex-col gap-[.75rem] pass-2">
//             <label className="text-sm text-[#4E4B66]" htmlFor="">Confirm
//               Password</label>
//             <input
//               className="rounded-lg text-[#4E4B66] p-[.75rem] border border-[#DEDEDE]"
//               type="password" name="" id=""
//               placeholder="Confirm your password" />
//           </div>
//         </div>
//       </div>
//       <button
//         name="btn"
//         className="w-fit bg-[#1D4ED8] justify-self-center p-[.75rem_5rem] rounded-xl text-white font-medium 
//         hover:opacity-80 hover:cursor-pointer self-center md:self-start">
//         Update changes
//       </button>
//     </form>
//   );
// }

// export default Preferences
