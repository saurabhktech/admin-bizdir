'use client'
import React,{useEffect,useState} from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import DateFormatter from '@/components/DateFormatter'
const page = () => {
  const [users,setUsers] = useState();
  const [loading,setLoading] = useState();
  const {data:session,status} = useSession();
  
 
  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(process.env.BACKEND_URL + "/api/user/all", {
        headers: {
          authorization: "Bearer " + session.jwt,
        },
      });

      const data = await res.json();
      console.log(data);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const disableUser = async (id,name) => {
    try {
      const res = await fetch(process.env.BACKEND_URL + `/api/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + session.jwt,
        },
        body: JSON.stringify({ user_status: "Disabled" }),
      });

      if (res.status === 200) {
        const data = await res.json();
        getUsers();
        toast.success(name+": Disabled Successfully!");
      } else {
        console.error("Failed to disable user");
        // Handle error
      }
    } catch (error) {
      console.error(error);
    }
  };

  const enableUser = async (id,name) => {
    try {
      const res = await fetch(process.env.BACKEND_URL + `/api/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + session.jwt,
        },
        body: JSON.stringify({ user_status: "Active" }),
      });

      if (res.status === 200) {
        const data = await res.json();
        getUsers();
        toast.success(name +": Enabled Successfully");
      } else {
        console.error("Failed to enable user");
        // Handle error
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
    
  
  return (
   <section>
  <div className="ad-com">
    <div className="ad-dash leftpadd">
      <div className="ud-cen">
        <div className="log-bor">&nbsp;</div>
        <span className="udb-inst">All User Details</span>
        <div className="ud-cen-s2">
          <h2>All Users - 248</h2>
          <div className="ad-int-sear">
            <input type="text" id="pg-sear" placeholder="Search this page.." />
          </div>
          <a href="admin-add-new-user.html" className="db-tit-btn">Add new user</a>
          {loading ? (
            <Skeleton count={5} />
          ):(
            <table className="responsive-table bordered" id="pg-resu">
            <thead>
              <tr>
                <th>No</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Plan type</th>
                <th>Update Status</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((item,index) => (
                <>
                  <tr>
                <td>{index +1}</td>
                <td><img src={item?.profile_image} alt=""/>{item.name}<DateFormatter dateString={item.createdAt} />
                </td>
                <td>{item.email}</td>
                <td><span className="db-list-rat">{item?.subscription?.user_plan}</span></td>
                <td className={`${(item.user_status ==='Active' || item.user_status === 'Inactive')? '!text-green-600':'!text-[#fd5b5b]'}`}>{item.user_status} {(item.user_status ==='Active' || item.user_status === 'Inactive')? (
                  <span  className="db-list-edit" onClick={() => disableUser(item._id,item.name)}>Disable</span>
                ):(<><span  className="db-list-edit" onClick={() => enableUser(item._id,item.name)}>Enable</span>
                <span className="w-12 h-12 bg-red-400 rounded-full"></span></>)} 
                  </td>
                <td><Link href={`/all-users/${item._id}`} className="db-list-edit" >Preview</Link></td>
              </tr>
                </>
              ))}
            
            </tbody>
          </table>
          )}
          
        </div>
      </div>
      <div className="ad-pgnat">
        <ul className="pagination">
          <li className="page-item"><a className="page-link" href="#">Previous</a></li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </div>
    </div>
  </div>
</section>

  )
}

export default page
