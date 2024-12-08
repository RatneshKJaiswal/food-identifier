// const genAI = new GoogleGenerativeAI("AIzaSyCLpkaZjdk3gMeO1b-uKi1gbyGwlP82HGQ")

// File: app/page.js
'use client'

import { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HowToUseSection from './components/HowToUseSection'

export default function Home() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
      setResult(null)
    }
  }

  const extractJSONFromText = (text) => {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      return {
        name: "Food Item",
        cuisine: "Unable to determine cuisine",
        ingredients: text,
        nutritionalInfo: {
          calories: "N/A",
          protein: "N/A",
          carbs: "N/A",
          fat: "N/A",
          fiber: "N/A"
        },
        details: {
          prepTime: "N/A",
          servingSize: "N/A",
          difficulty: "N/A",
          taste: "N/A"
        }
      }
    } catch (error) {
      console.error('JSON parsing error:', error)
      throw new Error('Failed to parse response data')
    }
  }

  const identifyFood = async () => {
    if (!image) return

    setLoading(true)
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCLpkaZjdk3gMeO1b-uKi1gbyGwlP82HGQ")
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      const base64Image = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result.split(',')[1])
        reader.readAsDataURL(image)
      })

      const prompt = `
        Analyze this food image and provide detailed information in the following JSON format (no markdown or code blocks):
        {
          "name": "Dish Name",
          "cuisine": "Cuisine Origin",
          "ingredients": "Main ingredients list",
          "nutritionalInfo": {
            "calories": "per serving",
            "protein": "in grams",
            "carbs": "in grams",
            "fat": "in grams",
            "fiber": "in grams"
          },
          "details": {
            "prepTime": "estimated preparation time",
            "servingSize": "typical serving size",
            "difficulty": "cooking difficulty level",
            "taste": "flavor profile description"
          }
        }
      `

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64Image,
            mimeType: "image/jpeg"
          }
        }
      ])

      const responseText = result.response.text()
      const parsedResult = extractJSONFromText(responseText)
      setResult(parsedResult)
    } catch (error) {
      console.error('Error:', error)
      setResult({ error: 'Failed to identify food item. Please try again.' })
    }
    setLoading(false)
  }

  return (

    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
        <div className="max-w-6xl mx-auto">

          {/* Header section */}
          <header className="text-center mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl -z-10"></div>
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
              FoodLens AI
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover the story behind every dish with our advanced AI food recognition technology.
              Get instant nutritional insights, ingredients, and culinary details with just a photo.
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                Try Now
              </button>
              <button className="px-8 py-3 bg-gray-800 rounded-full text-gray-300 font-semibold hover:bg-gray-700 transition-all duration-300 border border-gray-700">
                Learn More
              </button>
            </div>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 text-gray-100">Upload Food Image</h2>
              <div className="flex flex-col items-center gap-6">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-4 text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="mt-2 text-xs text-gray-500">PNG, JPG, or JPEG</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>

                {preview && (
                  <div className="w-full">
                    <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                    <button
                      onClick={identifyFood}
                      disabled={loading}
                      className="mt-4 w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 font-medium"
                    >
                      {loading ? 'Analyzing Image...' : 'Identify Food'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 text-gray-100">Food Information</h2>
              {result ? (
                result.error ? (
                  <div className="text-red-600 p-4 bg-red-50 rounded-lg">
                    <p className="font-medium">Error</p>
                    <p>{result.error}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-400">{result.name}</h3><br></br>
                      <p className="text-gray-400">Cuisine: {result.cuisine}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-500 mb-2">Ingredients</h4>
                      <p className="text-gray-400">{result.ingredients}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-500 mb-2">Nutritional Information</h4>
                      <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="divide-y divide-gray-200">
                          {Object.entries(result.nutritionalInfo).map(([key, value]) => (
                            <tr key={key}>
                              <td className="py-2 text-gray-500 capitalize">{key}</td>
                              <td className="py-2 text-gray-400 text-right">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-500 mb-2">Additional Details</h4>
                      <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="divide-y divide-gray-200">
                          {Object.entries(result.details).map(([key, value]) => (
                            <tr key={key}>
                              <td className="py-2 text-gray-500 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </td>
                              <td className="py-2 text-gray-400 text-right">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <p>Upload an image to see food information</p>
                </div>
              )}
            </div>
          </div>

          {/* How to Use Section */}
          <HowToUseSection />

          {/* Features Section */}
          <div className="mt-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-purple-600/10 blur-3xl -z-10"></div>
            <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-16">
              Why Choose FoodLens AI?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-3 w-14 h-14 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-3 group-hover:text-blue-400 transition-colors">
                  Instant Recognition
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Powered by Google's Gemini AI, our technology can identify thousands of dishes across global cuisines with exceptional accuracy in seconds.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-3 w-14 h-14 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-3 group-hover:text-purple-400 transition-colors">
                  Comprehensive Analysis
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Get detailed nutritional breakdowns, ingredient lists, preparation methods, and cultural insights for any dish you photograph.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10">
                <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-xl p-3 w-14 h-14 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-pink-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-3 group-hover:text-pink-400 transition-colors">
                  Real-Time Results
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Make informed decisions about your food choices with instant, accurate analysis delivered right to your device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>


  )
}