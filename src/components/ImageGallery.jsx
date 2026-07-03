import React, {useEffect, useState} from 'react';
import axios from 'axios';


const ImageGallery = () =>
{
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const ACCESS_KEY = "y60wDiw1ms7pWQQycph0trPMGWQ1cG4DsGwVIbMYDWY"


    //post
    //get
    //patch
    //put

    //200
    //400
    //500


    const fetchImages = async() => {
        setLoading(true);

        try {
            const response = await axios.get(`https://api.unsplash.com/photos`, {
                params: {
                    client_id:ACCESS_KEY,
                    page: page,
                    per_page: 12,
                }
            });
            setImages((prev)=>[...prev, ...response.data]);
        }
        catch (error) {
            alert(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchImages();
    },[page])


    if(loading) return <p>Loading....</p>


    return (
        <div>
                <h1>Gallery images</h1>

                <div style={{padding:"8px",display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' , gap:"8px"}}>
                    {
                        images.map((image, index) => (
                            <div key={`${image.id}-${index}`} className="image" style={{overflow:"hidden",borderRadius:"8px", boxSizing:"border-box"}}>
                                <img
                                    src={image.urls.small}
                                    alt={image.alt_description}
                                    style={{width:'100%',height:'200px',objectFit:'cover'}}
                                />

                                <p>
                                    from :{image.user.name}
                                </p>

                            </div>



                        ))
                    }




                </div>


                <div onClick={()=>setPage(prevPage=>prevPage+1)}
                     style={{backgroundColor:"#170fbb" ,padding:"8px 16px", borderRadius:"8px"}}
                >
                    {loading ? "Loading..." :"Load more"}
                </div>


        </div>
    );
};

export default ImageGallery;