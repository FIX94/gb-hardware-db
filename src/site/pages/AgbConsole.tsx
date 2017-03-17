import * as R from 'ramda';
import * as React from 'react';

import {Photo, AgbSubmission} from '../../crawler';
import {AgbMetadata} from '../../metadata';
import * as format from '../format';
import ConsolePageChip from '../components/ConsolePageChip';

export default function AgbConsole({submission}: {submission: AgbSubmission}) {
  return (
    <article className="page-agb-console">
      <h2>{`OXY: ${submission.title} [${submission.contributor}]`}</h2>
      <div className="page-agb-console__photo">
        {renderPhoto(submission, submission.photos.front)}
        {renderPhoto(submission, submission.photos.back)}
      </div>
      <dl>
        <dt>Color</dt>
        <dd>{format.optional(R.identity, submission.metadata.color)}</dd>
      </dl>
      <h3>Mainboard</h3>
      <div className="page-agb-console__photo">
        {renderPhoto(submission, submission.photos.pcbFront)}
        {renderPhoto(submission, submission.photos.pcbBack)}
      </div>
      <dl>
        <dt>Board type</dt>
        <dd>{submission.metadata.mainboard.type}</dd>
        <dt>Manufacture date</dt>
        <dd>{format.calendar(submission.metadata.mainboard)}</dd>
        <dt>Number pair on board</dt>
        <dd>{format.optional(R.identity, submission.metadata.mainboard.number_pair)}</dd>
        <dt>Stamp on board</dt>
        <dd>{format.optional(R.identity, submission.metadata.mainboard.stamp)}</dd>
        <dt>Circled letter(s) on board</dt>
        <dd>{format.optional(R.identity, submission.metadata.mainboard.circled_letters)}</dd>
      </dl>
      <h3>Chips</h3>
      {renderChips(submission.metadata)}
    </article>
  )
}

function renderPhoto(submission: AgbSubmission, photo: Photo | undefined) {
  if (!photo) {
    return null;
  }
  const url = `/static/agb/${submission.slug}_${photo.name}`
  return (
    <a href={url}>
      <img src={url} />
    </a>
  )
}

function renderChips({mainboard}: AgbMetadata) {
  return (
    <table>
      <tbody>
      <tr>
        <th />
        <th>Chip</th>
        <th>Type</th>
        <th>Date</th>
        <th>Label</th>
      </tr>
      <ConsolePageChip designator="U1" title="CPU" chip={mainboard.cpu} />
      <ConsolePageChip designator="U2" title="Work RAM" chip={mainboard.work_ram} />
      <ConsolePageChip designator="U3" title="Regulator" chip={mainboard.regulator} />
      <ConsolePageChip designator="U4" title="????" chip={mainboard.u4} />
      <ConsolePageChip designator="U6" title="Amplifier" chip={mainboard.amplifier} />
      <ConsolePageChip designator="X1" title="Crystal" chip={mainboard.crystal} />
      </tbody>
    </table>
  )
}
