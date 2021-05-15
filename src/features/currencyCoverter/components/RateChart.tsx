import { Fragment } from 'react'
import styles from './RateChart.module.css'

type LineChartProps = {
  data: { x: number; y: number }[]
  height: number
  width: number
  horizontalGuides: number
  verticalGuides: number
  precision: number
}

const LineChart = ({
  data,
  height,
  width,
  horizontalGuides: numberOfHorizontalGuides,
  verticalGuides: numberOfVerticalGuides,
  precision,
}: LineChartProps) => {
  const FONT_SIZE = width / 50
  const maximumXFromData = Math.max(...data.map((e) => e.x))
  const maximumYFromData = Math.max(...data.map((e) => e.y))

  const digits =
    parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1

  const padding = (FONT_SIZE + digits) * 3
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const points = data
    .map((element) => {
      const x = (element.x / maximumXFromData) * chartWidth + padding
      const y =
        chartHeight - (element.y / maximumYFromData) * chartHeight + padding
      return `${x},${y}`
    })
    .join(' ')

  const Axis = ({ points }: { points: string }) => (
    <polyline fill="none" stroke="#ccc" strokeWidth=".5" points={points} />
  )

  const XAxis = () => (
    <Axis
      points={`${padding},${height - padding} ${width - padding},${
        height - padding
      }`}
    />
  )

  const YAxis = () => (
    <Axis points={`${padding},${padding} ${padding},${height - padding}`} />
  )

  const VerticalGuides = (): JSX.Element => {
    const guideCount = numberOfVerticalGuides || data.length - 1
    const startY = padding
    const endY = height - padding

    return (
      <>
        {new Array(guideCount).fill(0).map((_, index) => {
          const ratio = (index + 1) / guideCount
          const xCoordinate = padding + ratio * (width - padding * 2)

          return (
            <Fragment key={index}>
              <polyline
                fill="none"
                stroke="#ccc"
                strokeWidth=".5"
                points={`${xCoordinate},${startY} ${xCoordinate},${endY}`}
              />
            </Fragment>
          )
        })}
      </>
    )
  }

  const HorizontalGuides = (): JSX.Element => {
    const startX = padding
    const endX = width - padding

    return (
      <>
        {new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
          const ratio = (index + 1) / numberOfHorizontalGuides
          const yCoordinate = chartHeight - chartHeight * ratio + padding

          return (
            <Fragment key={index}>
              <polyline
                fill="none"
                stroke={'#ccc'}
                strokeWidth=".5"
                points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
              />
            </Fragment>
          )
        })}
      </>
    )
  }

  const LabelsYAxis = (): JSX.Element => {
    const PARTS = numberOfHorizontalGuides
    return (
      <>
        {new Array(PARTS + 1).fill(0).map((_, index) => {
          const x = FONT_SIZE
          const ratio = index / numberOfHorizontalGuides

          const yCoordinate =
            chartHeight - chartHeight * ratio + padding + FONT_SIZE / 2
          return (
            <text
              key={index}
              x={x}
              y={yCoordinate}
              style={{
                fill: '#808080',
                fontSize: FONT_SIZE,
              }}
            >
              {
                //@ts-ignore
                parseFloat(maximumYFromData * (index / PARTS)).toFixed(
                  precision,
                )
              }
            </text>
          )
        })}
      </>
    )
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <XAxis />
      <YAxis />
      <LabelsYAxis />
      {numberOfVerticalGuides && <VerticalGuides />}
      <HorizontalGuides />

      <polyline fill="none" stroke="#0074d9" strokeWidth={2} points={points} />
    </svg>
  )
}

type RateChartProps = {
  rates: { x: number; y: number }[]
}

const RateChart = ({ rates }: RateChartProps) => (
  <div className={styles.container}>
    <LineChart
      width={500}
      height={300}
      data={rates}
      horizontalGuides={6}
      precision={2}
      verticalGuides={6}
    />
  </div>
)

export default RateChart
