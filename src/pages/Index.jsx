import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cat, Info, Award, Heart, Paw, Star, Sparkles, Music, Volume2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
  const [catHappiness, setCatHappiness] = useState(50);
  const [isMeowing, setIsMeowing] = useState(false);
  const [volume, setVolume] = useState(50);
  const [adoptionStats, setAdoptionStats] = useState([
    { month: 'Jan', adoptions: 65 },
    { month: 'Feb', adoptions: 59 },
    { month: 'Mar', adoptions: 80 },
    { month: 'Apr', adoptions: 81 },
    { month: 'May', adoptions: 56 },
    { month: 'Jun', adoptions: 55 },
  ]);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setLikeCount(prev => prev + 1);
    setCatHappiness(prev => Math.min(prev + 10, 100));
    toast({
      title: "Meow-velous!",
      description: "Your love for cats has been recorded!",
      duration: 3000,
    });
  };

  const playMeow = () => {
    setIsMeowing(true);
    const audio = new Audio('/meow.mp3');
    audio.volume = volume / 100;
    audio.play();
    setTimeout(() => setIsMeowing(false), 1000);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0]);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-100 to-pink-100">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold mb-8 text-center text-purple-800"
      >
        <Sparkles className="inline-block mr-2 h-12 w-12 text-yellow-400" />
        Purrfect Cat Paradise
        <Sparkles className="inline-block ml-2 h-12 w-12 text-yellow-400" />
      </motion.h1>
      
      <div className="max-w-5xl mx-auto">
        <motion.div className="fixed top-4 right-4 z-10 flex flex-col items-end space-y-4">
          <motion.div
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
            className="bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-bold mb-2">Cat Happiness Meter</h3>
            <Progress value={catHappiness} className="w-40 h-2 mb-2" />
            <p className="text-sm text-gray-600">{catHappiness}% Happy</p>
          </motion.div>
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-lg font-bold mb-2">Meow Player</h3>
            <div className="flex items-center space-x-2">
              <Button
                onClick={playMeow}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
                disabled={isMeowing}
              >
                {isMeowing ? <Music className="animate-spin" /> : <Volume2 />}
              </Button>
              <Slider
                value={[volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-24"
              />
            </div>
          </motion.div>
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
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-purple-800">Interactive Cat Playground</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <motion.img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg"
              alt="Playful cat"
              className="mx-auto w-64 h-64 object-cover rounded-full mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              drag
              dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            />
            <p className="text-lg mb-2">Drag the cat to play!</p>
            <Button
              onClick={() => {
                setCatHappiness(prev => Math.min(prev + 5, 100));
                toast({
                  title: "Purr-fect!",
                  description: "The cat enjoyed playing with you!",
                  duration: 2000,
                });
              }}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              <Paw className="mr-2 h-5 w-5" /> Pet the Cat
            </Button>
          </div>
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
                onClick={() => {
                  toast({
                    title: "Thanks for rating!",
                    description: `You gave us ${star} stars!`,
                    duration: 3000,
                  });
                  if (star >= 4) {
                    setCatHappiness(prev => Math.min(prev + 15, 100));
                  }
                }}
              >
                <Star className="h-10 w-10" />
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          className="mt-12 bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-purple-800 text-center">Cat Adoption Statistics</h2>
          <LineChart
            width={600}
            height={300}
            data={adoptionStats}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="adoptions" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </motion.div>
        
        <Dialog>
          <DialogTrigger asChild>
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg">
                Open Adoption Form
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Cat Adoption Form</DialogTitle>
              <DialogDescription>Fill out this form to start your cat adoption journey!</DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              toast({
                title: "Form Submitted!",
                description: "We'll be in touch about your cat adoption soon!",
                duration: 5000,
              });
            }}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Your Name</label>
                <input type="text" id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Why do you want to adopt a cat?</label>
                <textarea id="message" rows="4" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
              </div>
              <div className="flex items-center justify-center">
                <Button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Submit Adoption Form
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
