import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cat, Info, Award, Heart, Paw, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const catFacts = [
  "Cats have excellent night vision and can see at one-sixth the light level required for human vision.",
  "A group of cats is called a 'clowder'.",
  "Cats spend 70% of their lives sleeping.",
  "A cat's hearing is much more sensitive than humans and dogs.",
  "Cats have over 20 vocalizations, including the famous purr.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats can jump up to six times their length.",
  "A cat's nose print is unique, like a human's fingerprint.",
  "Cats have 32 muscles in each ear.",
  "The oldest known pet cat was found in a 9,500-year-old grave on the Mediterranean island of Cyprus."
];

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setLikeCount(prev => prev + 1);
    toast({
      title: "Meow-velous!",
      description: "Your love for cats has been recorded!",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-100 to-pink-100">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold mb-8 text-center text-purple-800"
      >
        Purrfect Cat Paradise
      </motion.h1>
      
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="fixed top-4 right-4 z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={handleLike}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg"
          >
            <Heart className="mr-2 h-5 w-5" /> Love Cats! ({likeCount})
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-lg mb-8 shadow-2xl"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          <motion.img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" 
            alt="Adorable cat" 
            className="mx-auto object-cover w-full h-[600px]"
            animate={{ scale: isHovering ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 0.7 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute bottom-4 left-4 right-4 text-white p-4 rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentFactIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-semibold"
              >
                <Paw className="inline-block mr-2 h-6 w-6" />
                {catFacts[currentFactIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </motion.div>
        
        <Tabs defaultValue="facts" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="facts"><Info className="mr-2 h-4 w-4" /> Feline Facts</TabsTrigger>
            <TabsTrigger value="breeds"><Cat className="mr-2 h-4 w-4" /> Popular Breeds</TabsTrigger>
            <TabsTrigger value="care"><Heart className="mr-2 h-4 w-4" /> Cat Care Tips</TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <TabsContent value="facts">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Fascinating Feline Facts</CardTitle>
                    <CardDescription>Discover the wonders of our furry companions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-2">
                      {catFacts.slice(0, 5).map((fact, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {fact}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            <TabsContent value="breeds">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Cat Breeds</CardTitle>
                    <CardDescription>Explore the diverse world of feline friends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-2 gap-4">
                      {[
                        { name: "Siamese", description: "Known for their distinctive coloring and vocal nature.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
                        { name: "Maine Coon", description: "One of the largest domesticated cat breeds with a distinctive physical appearance.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
                        { name: "Persian", description: "Recognized for their long fur and flat faces.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
                        { name: "Bengal", description: "Noted for their wild appearance resembling leopards.", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
                        { name: "Scottish Fold", description: "Famous for their unique folded ears and owl-like appearance.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg" }
                      ].map((breed, index) => (
                        <motion.li
                          key={index}
                          className="bg-white p-4 rounded-lg shadow-md overflow-hidden"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <img src={breed.image} alt={breed.name} className="w-full h-40 object-cover mb-4 rounded" />
                          <h3 className="font-bold text-lg mb-2">{breed.name}</h3>
                          <p>{breed.description}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            <TabsContent value="care">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Essential Cat Care Tips</CardTitle>
                    <CardDescription>Keep your feline friend happy and healthy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        { tip: "Provide a balanced diet", description: "Suitable for your cat's age and health condition." },
                        { tip: "Ensure fresh water", description: "Always have clean water available." },
                        { tip: "Regular grooming", description: "Helps reduce hairballs and strengthens your bond." },
                        { tip: "Annual check-ups", description: "Schedule regular visits with your veterinarian." },
                        { tip: "Mental stimulation", description: "Offer plenty of toys and play sessions." }
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Paw className="mr-2 h-5 w-5 text-pink-500 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-bold">{item.tip}</h3>
                            <p>{item.description}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
        
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-purple-800">Rate Your Cat Experience</h2>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-yellow-400 text-4xl focus:outline-none"
                onClick={() => toast({
                  title: "Thanks for rating!",
                  description: `You gave us ${star} stars!`,
                  duration: 3000,
                })}
              >
                <Star className="h-10 w-10" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
