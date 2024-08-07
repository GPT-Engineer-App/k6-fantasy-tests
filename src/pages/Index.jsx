import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cat, Info, Award, Heart } from "lucide-react";

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-100 to-pink-100">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-8 text-center text-purple-800"
      >
        Purrfect Cat Paradise
      </motion.h1>
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" 
            alt="Adorable cat" 
            className="mx-auto object-cover w-full h-[500px] rounded-lg mb-8 shadow-lg"
          />
        </motion.div>
        
        <Tabs defaultValue="facts" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="facts"><Info className="mr-2 h-4 w-4" /> Feline Facts</TabsTrigger>
            <TabsTrigger value="breeds"><Cat className="mr-2 h-4 w-4" /> Popular Breeds</TabsTrigger>
            <TabsTrigger value="care"><Heart className="mr-2 h-4 w-4" /> Cat Care Tips</TabsTrigger>
          </TabsList>
          <TabsContent value="facts">
            <Card>
              <CardHeader>
                <CardTitle>Fascinating Feline Facts</CardTitle>
                <CardDescription>Discover the wonders of our furry companions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cats have excellent night vision and can see at one-sixth the light level required for human vision.</li>
                  <li>A group of cats is called a "clowder".</li>
                  <li>Cats spend 70% of their lives sleeping.</li>
                  <li>A cat's hearing is much more sensitive than humans and dogs.</li>
                  <li>Cats have over 20 vocalizations, including the famous purr.</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle>Popular Cat Breeds</CardTitle>
                <CardDescription>Explore the diverse world of feline friends</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Siamese: Known for their distinctive coloring and vocal nature.</li>
                  <li>Maine Coon: One of the largest domesticated cat breeds with a distinctive physical appearance.</li>
                  <li>Persian: Recognized for their long fur and flat faces.</li>
                  <li>Bengal: Noted for their wild appearance resembling leopards.</li>
                  <li>Scottish Fold: Famous for their unique folded ears and owl-like appearance.</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="care">
            <Card>
              <CardHeader>
                <CardTitle>Essential Cat Care Tips</CardTitle>
                <CardDescription>Keep your feline friend happy and healthy</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide a balanced diet suitable for your cat's age and health condition.</li>
                  <li>Ensure fresh water is always available.</li>
                  <li>Regular grooming helps reduce hairballs and strengthens your bond.</li>
                  <li>Schedule annual check-ups with your veterinarian.</li>
                  <li>Offer plenty of mental stimulation with toys and play sessions.</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button 
            onClick={() => setLikeCount(prev => prev + 1)}
            className="bg-pink-500 hover:bg-pink-600"
          >
            <Award className="mr-2 h-4 w-4" /> Love Cats! ({likeCount})
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
