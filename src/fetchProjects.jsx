import { createClient } from "contentful";
import { useEffect, useState } from "react";

const client = createClient({
  space: "3avg8k6hsqvs",
  accessToken: import.meta.env.VITE_API_KEY ,
});

// client.getEntries({ content_type: "projects" }).then((response) => {
//   console.log(response);
// });

//custom hook
export const useFetchProjects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const getData = async () => {
    try {
      const response = await client.getEntries({ content_type: "projects" });
      console.log(response.items);
      //parsing all the item we want
      const projects = response.items.map((item) => {
        const { image, title, url } = item.fields;
        const id = item.sys.id;
        const img = image.fields.file.url;
        return { title, url, id, img };
      });
      setProjects(projects);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { isLoading, projects };
};
