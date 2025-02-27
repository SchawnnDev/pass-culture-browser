import createCachedSelector from 're-reselect'

const selectRecommendation = createCachedSelector(
  state => state.data.recommendations,
  (state, recommendationId) => recommendationId,
  (recommendations, recommendationId) => {
    const item = recommendations.find(o => o.id === recommendationId)
    return item
  }
)((state, recommendationId) => recommendationId || '')

export default selectRecommendation
